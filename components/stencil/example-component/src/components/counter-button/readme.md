# counter-button

<!-- Auto Generated Below -->

## Overview

CounterButton exposes a pressable control that tracks a count internally and notifies consumers
whenever it changes. The component is self-contained yet easy to wire into analytics or state stores
via the `countChange` event.

## Properties

| Property      | Attribute     | Description                                          | Type     | Default     |
| ------------- | ------------- | ---------------------------------------------------- | -------- | ----------- |
| `description` | `description` | Optional description text rendered below the button. | `string` | `undefined` |
| `initial`     | `initial`     | Initial value used when the component connects.      | `number` | `0`         |

## Events

| Event         | Description                             | Type                  |
| ------------- | --------------------------------------- | --------------------- |
| `countChange` | Emitted every time the counter changes. | `CustomEvent<number>` |

---

_Built with [StencilJS](https://stenciljs.com/)_
