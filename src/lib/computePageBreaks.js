// Shared between the live builder preview (shows where a page break would
// land, before download) and the actual PDF export (Builder.jsx), so both
// always agree on the same page boundaries.
//
// Returns break positions in mm from the top of the resume. A resume that
// fits on one page (or overflows by less than maxStretch) returns just
// [0, totalHeightMm] — one page. Longer resumes get real page breaks,
// pulled back to avoid landing just after a heading (see minSectionLead).
export function computePageBreaks({
  headingTopsMm,
  totalHeightMm,
  maxPageHeight = 297,
  minSectionLead = 20,
  maxStretch = 200,
}) {
  const breaks = [0];
  let cursor = 0;

  while (totalHeightMm - cursor > maxPageHeight + maxStretch) {
    let end = cursor + maxPageHeight;
    const strandedHeading = headingTopsMm.find(
      (h) => h > cursor && h <= end && end - h < minSectionLead
    );
    if (strandedHeading !== undefined) end = strandedHeading;
    breaks.push(end);
    cursor = end;
  }

  breaks.push(totalHeightMm);
  return breaks;
}

// Measures section heading (h2/h3) top positions and total height of a
// resume container, in mm, using the same 210mm-wide scale every template
// renders at (see PREVIEW_NATIVE_WIDTH in Builder.jsx).
export function measureResumeMm(containerEl) {
  const rect = containerEl.getBoundingClientRect();
  const pxToMm = 210 / rect.width;
  const headingTopsMm = [...containerEl.querySelectorAll("h2, h3")]
    .map((el) => (el.getBoundingClientRect().top - rect.top) * pxToMm)
    .sort((a, b) => a - b);
  return { headingTopsMm, totalHeightMm: rect.height * pxToMm };
}
