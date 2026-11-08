# Daisy's Farm

## Goal

Make a web app for phones, tablets, and desktop browsers for a 2½-year-old who can already say the numbers up to 20 and is learning what they look like. The first version teaches **1–5** through four short games in one farm. She hears “three,” sees **3**, counts three pieces of produce, and can trace the same shape with her finger. Recognizing a numeral when it appears on its own is the main learning goal. [IES early-math practice guide, p. 21](https://ies.ed.gov/ncee/wwc/Docs/practiceguide/early_math_pg_111313.pdf)

## Bring Windswept to the farm

Use the [approved Pick and Count mockup](mockups/windswept-reference.png) as the visual reference for the home screen, all four games, and their hint, replay, and completion states on every screen size. Use the [revised Read the Sign mockup](mockups/read-sign-v6.png) as the backdrop reference across screens. Keep a broad stretch of open cobalt sky, one main sculptural cloud bank, low hazy East Bay hills, a thin band of marsh, and tall foreground marsh grasses leaning together. Where Daisy sits, layer blades behind her and a dense clump of foreground sedges in front. Hide the paws and lower silhouette in the grass so she reads as seated within the meadow. Use a soft contact shadow to anchor her in the grass. Let Daisy and a few grass tips overlap the outer edge of the play surface. Keep numerals, prompts, and controls clear. Make the foreground art ignore pointer events so the full touch area stays usable. On narrow screens, crop around the cloud bank and low horizon so the scenery still reads behind the play area. Keep the cream play surface, deep olive type and navigation, and warm gold pills. Scale or reposition Daisy and the scenery on small screens to keep the play area clear.

Use the approved seated Daisy as the character reference across screens. Match the painted face, posture, and coat markings in this mockup. Use the original photos to check likeness when drawing a new angle. Paint every crop, tray, sign, and prop with the same matte brushwork and warm light over cool shadows.

- **One painted place.** Set Daisy’s farm on the edge of an East Bay marsh. A low ridge, distant haze, and sculptural clouds fill the upper scene. A garden bed and a wooden produce stand sit close enough to touch. Paint the terrain as a fixed layer and keep the clouds separate. Paint Daisy, the family’s hound-beagle mix, as the farm guide. Use the front portrait (IMG_1145.jpeg), side profile (IMG_9811.jpeg), and seated view (IMG_0554.jpeg) in the Daisy photo folder to check her likeness. Preserve her level tan brow, dark rims around almond-shaped brown eyes, broad low-set ears with rounded ends, straight tapered muzzle with fine gray ticking near the nose, white bib and paws, and dark saddle. Use the Dot avatar as a guide to simplification once her likeness reads clearly in the painted portrait. Give her a small head tilt or tail wag when she reacts.
- **Use Windswept’s summer palette for the first build.** Start with sky blue `#0753AA`, ground olive `#343D2B`, card olive `#434D33`, pale cream `#FCF4DC`, and warm gold `#F6D78E` for the primary pill button and active controls. Use cream boards with deep olive numerals during play. Put the brighter reds, purples, and greens into the produce. Keep number signs the same color so color gives no clue to the answer.
- **Paint the produce in the same hand as the landscape.** Build each strawberry, blueberry, carrot, and snap pea from broad matte color shapes, warm sunlight, and cool reflected shadows. Use irregular natural silhouettes and a few small marks for seeds or veins. Paint tapered greens like the foreground grasses. Give each piece a clear outline and space so it counts easily at phone size. Apply the same treatment to the game tiles, crate art, and baskets.
- **Keep the screen quiet.** Use the full-bleed painting, a short title in regular-weight Trebuchet MS, one gold action, and rounded, subtly bordered surfaces. Use large, simple custom icons. Let clouds drift slowly on the farm screen and hold the scenery still during games. Use a still scene throughout with Reduce Motion enabled. Daisy’s reactions stay short and close to the action.
- **Use one consistent numeral style.** Choose a clear, heavy sans-serif shape for each numeral and build the tracing paths to match. Use the same shapes on the choice signs, baskets, and tracing board. Keep the entire shape readable against a solid surface.

[The Tan Family](https://www.thetanfamily.net/) · [Windswept style guide](https://www.thetanfamily.net/design/assets/windswept/style.md) · [Windswept specimen](https://www.thetanfamily.net/design/assets/windswept/specimen.html)

## Screen mockups

[Home](mockups/landing-marsh.png) · [Pick and Count](mockups/pick-and-count-marsh.png) · [Find the Number](mockups/find-the-number-marsh.png) · [Read the Sign](mockups/read-sign-v6.png) · [Trace the Sign on mobile](mockups/trace-the-sign-marsh.png)

Find the Number shows “Play again” after the round is complete. Use the listen button to repeat the prompt during play.

## One trip from the garden to the farm stand

[Pick and pack](mockups/flow-harvest.png) · [Take to the stand and find the sign](mockups/flow-stand.png) · [Open the basket and trace](mockups/flow-reveal.png)

**Play** starts a guided trip. Choose one quantity from 1–5 and one crop at the beginning and carry them through the whole trip.

1. **Pick and Count.** Start at a painted garden bed with ripe strawberries on the plants and an empty tray beside them. Each tap moves one berry to the tray and Daisy counts it aloud. After the last berry, Daisy says “Three strawberries!” and the **3** appears. Tap **Take to the stand** to carry that tray forward.
2. **Find the Number.** At the stand, Daisy asks for the matching number sign. She picks **3** from two equally styled signs. The chosen sign goes onto the basket, and the strawberries from her tray go inside. Close the lid before the next step.
3. **Read the Sign.** With the berries hidden, Daisy asks “What number is this?” She can say the answer aloud, then open the basket to hear “Three strawberries!” and see the same berries she picked.
4. **Trace the Sign.** Trace **3** with the ladybug, then see the finished sign beside the filled basket. Daisy gives a small tail wag. **Play again** starts a fresh trip with a different number or crop.

Keep each stage in the same Windswept farm and use one clear next action. The four landing tiles also open the individual activities for quick practice. The existing mockups show individual stages. In guided play, replace each intermediate replay button with the action that advances the trip.

## Four games at the farm stand

| Game | What happens |
| --- | --- |
| **Pick and Count** | Daisy asks for three strawberries. She taps berries on the plants to move them into the tray. Each berry counts once. Daisy says each count in order, then says “Three strawberries” as **3** appears above the tray. |
| **Find the Number** | Daisy asks “Can you find three?” Two equally styled signs appear. Their positions vary. If she taps the other sign or needs help, Daisy names and points to **3** and lets her tap it to finish. The prompt can be replayed at any time. |
| **Read the Sign** | Daisy shows a numeral beside a closed basket and asks “What number is this?” She can say her guess aloud, then open the basket to hear the answer and see the matching quantity. |
| **Trace the Sign** | Daisy names a large numeral. A ladybug marks the start and demonstrates the stroke. Her finger or mouse leaves a bright trail as she follows the wide path. After a lift, she can resume near the last point. Wandering off the path pauses progress without erasing the trail. Once she finishes, Daisy says the number and puts the sign beside that many pieces of produce. |

Mix strawberries, blueberries, carrots, and snap peas across rounds. Keep the numeral visible when Daisy names the total. Mix the number order across rounds and keep the screen free of timers and scores.

### How Read the Sign plays

1. Show one large numeral, such as **3**, beside a closed basket. Daisy asks, “What number is this?” The listen button repeats the question. Keep the produce hidden while she thinks.
2. She can say “three” aloud, or open the basket whenever she’s ready. Tapping the basket or **Open basket** reveals the answer. The game never asks her to speak into a microphone or scores what she says.
3. Keep **3** visible. Daisy says, “Three! Three carrots,” as the lid opens and three clearly separated carrots appear. In guided play, use the crop she picked earlier and name it accordingly. She can count them with a grown-up. **Play again** starts a fresh round with another numeral and a closed basket.

Use a low, lidded reed basket in both states. Paint it with broad straw and ochre strokes and cool blue-gray shadows, like the wood tray in the approved Windswept reference. Keep the lid and handle easy to read at phone size.

## First web build

1. Build a static single-page app using HTML, CSS, and JavaScript. Use one column on phones and a wider play area with controls beside it where space allows. Let short screens scroll naturally. Support portrait and landscape without requiring rotation. Keep the same back and listen buttons in every game, with visible keyboard focus and at least 60 CSS pixels of touch area for child controls.
2. Use native buttons for produce, number choices, and other tap actions so they also work with a mouse and keyboard. Share round data for the target numeral, produce, and visible prompts. Bundle artwork and visible prompts. Audio is deferred at the user's request. Show each count visibly during picking.
3. Build the tracing board as a responsive SVG with ordered stroke paths for 1–5. Use Pointer Events for touch, mouse, and pen. Capture the active pointer, convert screen coordinates into SVG coordinates, and advance through ordered checkpoints within a forgiving corridor. Scale the corridor with the board. Apply `touch-action: none` only on the tracing surface so the page still scrolls around it. On release or cancellation, keep progress and let her resume near the last point. Offer a keyboard-accessible demonstration and a way back to the other games.
4. Keep the app client-side with no accounts, microphone access, ads, or analytics. Package it for static HTTPS hosting and cache the app shell, art, and prompts with a versioned service worker for offline use after the first successful online load. Use summer for the first build. Extend the range to **6–9**, then **0** with an empty basket, then **10–20**. Add the other Windswept seasons once the games work well across screens.

## Check it on phones, tablets, and desktop

- Compare the home screen and all four games side by side with the approved Pick and Count reference. Check that Daisy reads as the same dog, the signs and controls use the same colors and shapes, and the produce and props share the brushwork of the landscape.

- Test on iPhone and iPad Safari, Android Chrome, and desktop Safari, Chrome, and Firefox. Check both orientations on mobile and tablet, plus narrow and wide desktop windows. Verify that numbers and controls stay readable and easy to reach without horizontal scrolling or the artwork blocking a tap.
- Run a full guided trip and verify that the chosen numeral, crop, and quantity carry through all four stages.
- Run every game with each of 1–5. Check that repeated taps never add the same object twice, spoken counts stay in order, and the numeral matches the total. Check that replay, retry, and back work mid-round and that keyboard focus is visible.
- Trace with a finger and a mouse. Check short strokes, fast strokes, finger lifts, pointer cancellation, small deviations, and skipped sections. A scribble across the board cannot finish the numeral. Confirm that the board holds the gesture while the surrounding page still scrolls.
- Check contrast, screen-reader names for controls and signs, and reduced motion. Confirm that no audio plays. Offline caching is a future enhancement.

- Play alongside her for a few short rounds. See whether she can find a numeral when its position changes and when the produce is hidden. If she follows the demonstration but struggles to trace, widen the corridor before introducing more numbers.
