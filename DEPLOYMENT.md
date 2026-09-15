# Automintly landing release — September 10, 2026

## Prepared client dashboard access and install launcher — September 15, 2026

The public homepage now has a visible Client Dashboard link on desktop, a compact
Dashboard control on mobile, and matching footer access. A dedicated client
access page provides an Open protected dashboard link plus an installable web-app
launcher for supported desktop and mobile browsers. The launcher caches only its
public shell; it does not cache customer records or protected dashboard pages.

Access is accurately labeled invitation-only. The current destination is the
existing protected staging sign-in, not a production customer portal. Production
identity, recovery, backups, capacity and provider verification remain required
before real customer activation.

All 27 marketing, compliance, accessibility and catalog tests pass. Desktop and
390×844 browser checks confirmed readable layouts, visible access controls and no
console warnings or errors. This release is prepared locally and has not been
published.

## Published desktop forward-loop v23

The live desktop-only source now points to
`automintly-orbital-forward-desktop-4k-seamless-v23.mp4`. It preserves the
accepted 3840×2160/24 fps source and uses forward playback only. The final 1.5
seconds blend into the first 1.5 seconds, and the resulting 8.5-second cycle is
cut at the matching forward frame so the browser loop advances without the old
hard reset. No reverse, still-image side fill, generated clouds or planet warp is
used. Mobile remains byte-for-byte on the accepted v17c sources.

The first/last 960×540 analysis frames were visually matched, and direct decoded
video comparison measured SSIM 0.974514; the remaining difference is the
intended one-frame forward advance rather than a jump to an unrelated frame. A
media-level verifier also proves the 3840×2160/24 fps/204-frame encoding and
guards against reverse or ping-pong playback. The user explicitly authorized
publication on September 12, 2026. Release commit `de8dad2` was pushed to the
existing `main` branch and the connected host deployed it successfully.

Local browser review is complete. At 1920×1080 the primary video selected v23,
reported its native 3840×2160 dimensions, covered the complete viewport and
remained ready, playing and unified across two observed 8.5-second wraps. At
390×844 both foreground and backdrop continued to select the accepted v17c
portrait source. The focused release checks pass: 21 entry tests, 12
shooting-star tests, five media/seam tests, and the five-page validator (16
script blocks and 92 local links). Live verification returned HTTP 200 for the
homepage and the new MP4; the homepage references both desktop v23 and unchanged
mobile v17c, and the live MP4 reports the expected 38,775,077-byte content
length.

## Approved release: PC-only v22

The user explicitly requested publication of this prepared update. Only the PC
shooting-star refinement is included; no paid generation or new cloud video.

The user explicitly locked mobile: preserve the accepted v21 video, layout,
typography, buttons and original shooting star. The new `shooting-star.js` is
desktop-only (769px and wider), with densely sampled transform/opacity tracks
and moderated projected acceleration for the near-camera flyby. It completely
cancels its animation when switching to mobile, leaving the original CSS star
in charge. Entry JavaScript, all non-meteor CSS, and source media are unchanged.

61 regression tests and the five-page validator pass. Desktop/mobile browser
checks confirm the source and breakpoint isolation. Actual FPS is not measured.
This does **not** fix the cloud video's visible end transition. A new loop-ready
source is still needed; no rejected cloud effect is installed. Commit, push and
live verification evidence are recorded in the parent deployment status file.

## Retained v21 restoration: previous video clouds and motion

The user rejected the rebuilt v20 clouds and requested the previous clouds and
motion back, keeping the shooting star. The main homepage now uses the exact
pre-v20 `automintly-orbital-forward-desktop-4k-v17.mp4` again: 3840x2160,
24 fps, 10 seconds, 52,747,685 bytes; SHA256
`f9a383780830ebfa336557e4b92032d3ced12d61fe4503773f2c856bba8fd8c8`.

No media reprocessing, new cloud treatment, reverse playback, or new loop
technique was applied. This restores the previous video's motion and existing
end transition, not a new seamless-loop implementation. The procedural cloud
renderer, still-image layer, and cloud-only CSS are no longer loaded by the
homepage. Their source files remain recoverable but inactive.

Shared CSS, the current near-miss shooting star, mobile v17c video/poster,
native typography/buttons, and the rest of the charcoal website are unchanged.
The desktop video plays muted/inline/looping; the hidden mobile backdrop stays
paused on desktop. Entering the site pauses both videos.

## Previous release: v20 (superseded)

The user approved publishing the v20 4K volumetric-cloud preview to the main
desktop landing page. Existing Git-connected production route: this repository's
`main` branch; no hosting migration or paid generation.

## Included

- Desktop-only deterministic cloud density circulating forward in a fixed
  spherical shell. Full cycle: 24 hours. No video restart, reversal or crossfade.
- Up to 3840 x 2160 rendering, preserving the approved sky, moon, framing,
  native typography, buttons and near-miss shooting star. Frame rate is
  device-dependent; local browser measured about 29 fps in 4K mode.
- Mobile keeps the v17c portrait video/poster and compact native interface.
  The desktop renderer is not initialized on mobile; the desktop sky image is
  selected only above the 768px breakpoint.
- Animation pauses when the intro is hidden, the tab is hidden, or the viewport
  becomes mobile. Reduced-motion preference renders a still; WebGL failure
  leaves the sky/horizon photograph visible and navigation usable.
- Existing charcoal site content, builder, pricing and forms are unchanged.

## Pre-publication verification

- 28 cloud and 23 landing tests pass; five-page validator passes 16 script
  blocks and 92 local links. Test scripts are in the parent workspace's `tmp`.
- Browser: desktop canvas ready in 4K mode, both unused videos paused with no
  selected source; Explore opens/focuses the existing site; Back restores intro.
- Fresh 390 x 844 mobile load: both original 1080 x 1920 v17c sources selected,
  canvas hidden/uninitialized, one native logo/headline and one button pair.
- Phase 0/1 rendered comparisons from the approved v20 preview are identical;
  unit tests independently verify continuous position and velocity at wrap.

Detailed release/HTTP verification belongs in the parent workspace's
`WEBSITE-DEPLOYMENT-STATUS.md`. Old experimental assets are not part of this
release and have not been deleted.
