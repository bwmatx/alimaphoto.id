CONTACT PAGE FOLLOW-UP REVISION

## Date Picker Modal Positioning Fix

Current Issue:

When the "Tanggal Acara" field is clicked, the date picker popup is positioned relative to the input field.

This behavior is not desired.

### Required Behavior

The date picker must behave as a true modal dialog.

Requirements:

* Always appear centered within the viewport.
* Use fixed positioning.
* Be vertically centered.
* Be horizontally centered.
* Remain centered regardless of:

  * page scroll position
  * screen size
  * form location
  * viewport changes

### Implementation Notes

Do not anchor the date picker to the date input field.

Do not position the popup below the input field.

The date picker should open above a dark overlay similar to a modal.

Desired behavior:

* User clicks "Tanggal Acara"
* Background receives overlay
* Date picker appears in the center of the screen
* User selects date
* Date picker closes
* Selected value is populated into the existing field

Preserve all existing date selection logic.

Only update modal positioning and presentation.

---

## CTA Button Styling Fix

Current Issue:

The "Konfirmasi" and "Batal" buttons inside the date picker still use a transparent background.

This does not match the luxury visual system.

### Required Behavior

Buttons must use solid backgrounds.

No transparent button backgrounds.

### Konfirmasi Button

Style:

* Solid gold background
* Color: #D5AF36
* Dark text
* Strong visual emphasis
* Premium hover state

Hover:

* Slight brightness increase
* Subtle lift effect

---

### Batal Button

Style:

* Solid dark background
* Background: #1A1A1A
* Border: subtle gold outline
* White text

Hover:

* Slightly lighter dark tone
* Soft transition

---

## Visual Consistency

The date picker must visually match:

* landingpage_prd.md
* luxury black edition theme
* contact page styling

Avoid:

* transparent buttons
* Bootstrap default styles
* browser default styles
* light theme elements

The date picker should feel like a premium part of the Alima Photo booking experience.
