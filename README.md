# Daisy’s Farm

A responsive, silent number garden for young children. Choose one of four independent activities: pick strawberries, match a harvest to a numeral, open a numbered basket, or trace a numeral. There is no connected play mode. Replay stays in the selected activity.

Serve this directory with any static web server, for example `python3 -m http.server 8080`. Open the page in a browser.

The scene automatically follows California meteorological seasons. The season button previews the other palettes. Seasonal paintings, clouds, egret, swallows, and pintails are adapted from the Tan Family Windswept implementation. Reduced motion freezes the atmospheric animation.

All imagery is served locally. The project contains no audio or microphone integration.

## Art and source

Seasonal scene modules and generated landscape assets adapted from the owner's Tan Family / Windswept project. Four seasonal Daisy sprites generated from the approved Daisy’s Farm concept, with matching light and marsh grasses. Personal photographs are excluded. Strawberries and baskets use painted raster artwork with visible seeds, leaves, woven structure, and broad brushwork.

The mockups record design development. The working app is an initial implementation with painted produce and baskets; planting beds and harvest trays use separate painted layers. Leaves rustle on pointer interaction and keyboard focus; picked berries settle into the tray. These animations respect reduced motion. The stand frame remains a CSS prop.

## Visual guidance

Picture buttons and tap-hand hints guide play without requiring reading. Picking shows a numeral, strawberry, and destination tray. Number matching displays the harvest. Tracing demonstrates the path once and keeps a visible start marker; touching the path interrupts the demonstration. Text labels remain for adults and accessibility. Automatic motion is disabled with reduced motion.

## Completion feedback

Completing an activity brings Daisy into the game panel, looking at the child with a small tongue peek and a short tail wag. All four seasonal reward portraits retain the matching marsh palette. Picking celebrates the completed harvest, matching celebrates a correct answer, and tracing celebrates reaching the end of the stroke. The basket activity celebrates discovery; without audio input, it does not assess a spoken answer. Reduced-motion users see the happy pose without the wag.
