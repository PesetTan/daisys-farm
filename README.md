# Daisy’s Farm

A responsive, silent number garden for young children. Pick strawberries, carry the harvest to the stand, choose its number, open the basket, and trace the numeral.

Serve this directory with any static web server, for example `python3 -m http.server 8080`. Open the page in a browser.

The scene automatically follows California meteorological seasons. The season button previews the other palettes. Seasonal paintings, clouds, egret, swallows, and pintails are adapted from the Tan Family Windswept implementation. Reduced motion freezes the atmospheric animation.

All imagery is served locally. The project contains no audio or microphone integration.

## Art and source

Seasonal scene modules and generated landscape assets adapted from the owner's Tan Family / Windswept project. Four seasonal Daisy sprites generated from the approved Daisy’s Farm concept, with matching light and marsh grasses. Personal photographs are excluded. Strawberries and baskets use painted raster artwork with visible seeds, leaves, woven structure, and broad brushwork.

The mockups record design development. The working app is an initial implementation with painted produce and baskets; planting beds and harvest trays use separate painted layers. Leaves rustle on pointer interaction and keyboard focus; picked berries settle into the tray. These animations respect reduced motion. The stand frame remains a CSS prop.

## Visual guidance

Picture buttons and tap-hand hints guide play without requiring reading. Picking shows a numeral, strawberry, and destination tray. Number matching displays the harvest. Tracing demonstrates the path once and keeps a visible start marker; touching the path interrupts the demonstration. Text labels remain for adults and accessibility. Automatic motion is disabled with reduced motion.
