# Bugs found

Static review findings, ordered by user impact. All four have been fixed in the current working tree.

## 1. Mobile standby shortcuts open portfolio sections without activating the dial

**Severity: P2**

**Status: Fixed**

The mobile dock is now omitted in standby ([`OmnitrixInterface.jsx`](src/components/OmnitrixInterface.jsx#L262)), and `goToSection` accepts only navigation and section stages ([`useOmnitrixState.js`](src/hooks/useOmnitrixState.js#L79)). This blocks direct section opening before core activation.

## 2. The hidden carousel creates an invisible keyboard stop in standby

**Severity: P2**

**Status: Fixed**

The hidden carousel is now inert and hidden from assistive technology while in standby, and its controls are disabled ([`OmnitrixInterface.jsx`](src/components/OmnitrixInterface.jsx#L124)).

## 3. Escape navigation is ignored when focus is on a control

**Severity: P2**

**Status: Fixed**

Escape is now handled before the guard for inputs, buttons, and links ([`useKeyboardNav.js`](src/hooks/useKeyboardNav.js#L16)), so it works when one of those controls has focus.

## 4. Browser history can be overwritten by an in-flight transition timer

**Severity: P2**

**Status: Fixed**

The route listener now clears pending transition timers before syncing the UI to the browser URL ([`useOmnitrixState.js`](src/hooks/useOmnitrixState.js#L26)), preventing an older callback from overriding the restored route.

## Verification

`npm run build` completes successfully after the fixes. No automated tests were run.

## Second pass

The four findings above remain fixed. This review of the current working tree found three additional issues.

### 5. The hidden desktop sidebar remains tabbable in standby

**Severity: P2**

At wide screen sizes, the sidebar is hidden visually with opacity and pointer events, but it is not removed from the accessibility tree or keyboard order ([`OmnitrixInterface.jsx`](src/components/OmnitrixInterface.jsx#L105)). Its six buttons remain enabled; activating them in standby is silently rejected by `goToSection` ([`useOmnitrixState.js`](src/hooks/useOmnitrixState.js#L98)). Keyboard users therefore encounter several invisible controls that do nothing.

### 6. The invisible standby prompt can activate a section

**Severity: P2**

The prompt always has `role="button"` and `tabIndex={0}`, even when its opacity is zero and pointer events are disabled during dial navigation ([`OmnitrixInterface.jsx`](src/components/OmnitrixInterface.jsx#L161)). When it receives focus, Enter or Space is handled by the global keyboard shortcut as a section activation, so an invisible “CLICK CORE TO ACTIVATE” prompt opens the selected section instead of being excluded from navigation.

### 7. The copy address action opens the mail app when clipboard access fails

**Severity: P3**

If the Clipboard API is unavailable or permission is denied, the copy handler redirects to `mailto:` instead of copying the address or reporting the failure ([`ContactSection.jsx`](src/components/sections/ContactSection.jsx#L8)). In those browsers, the “COPY ADDRESS” button unexpectedly opens the visitor’s email app.

## Verification (second pass)

`npm run build` completes successfully. No automated tests were run.
