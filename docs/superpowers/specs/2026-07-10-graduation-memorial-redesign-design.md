# Graduation memorial redesign

## Direction

The site becomes a restrained digital yearbook: a typography-only cover, three full-width memory chapters, a full-screen teacher-quote archive, and a deliberately spacious single-column photo archive. Real photographs remain the primary content; the interface stays quiet around them.

## Visual system

- Warm paper background with one moving prismatic glow. No particles, lines, stacked color blobs, or purple AI gradients.
- Apple-like system typography: SF Pro and PingFang on Apple devices, Segoe UI and Microsoft YaHei on Windows.
- Large, light-weight cover typography with `高峰学校` kept on one line at every breakpoint.
- Editorial numbering and captions create rhythm without cards or decorative containers.
- Header controls are text links with precise rules and hover states, not pill-shaped buttons.

## Layout and behavior

- The first viewport contains only the title cover and navigation; photographs begin below the fold.
- Home photographs preserve their natural aspect ratios and alternate between full, right-offset, and left-offset widths.
- The gallery remains a spacious vertical sequence, matching the homepage instead of becoming a masonry grid.
- Teacher quotes open in a full-screen dialog. All quotes participate in continuous, evenly paced streams; the dialog closes by button or Escape.
- The existing `#gallery` route, personal-blog link, image order, title, and `Designed by ZongRui` signature remain intact.

## Responsive and motion

- Mobile: one photo per row, full usable width, compact captions, safe-area-aware header and signature.
- Tablet: preserve generous margins and offset photo rhythm without horizontal overflow.
- Desktop: maximum reading width of 1440px; photographs never upscale beyond their useful display size.
- Reduced-motion users receive a static glow, no quote scrolling, and no reveal transitions.
