<div align="center">
  <img src=".github/logo.png" width="512">
</div>

---

<h4 align="center">
  Contribution Guidelines
</h4>

## UI
### `Menus`
---
Registering a `Menu` within the `MenuBar` is as easy as pie. Head over to [MenuBar.jsx](candis/app/client/app/meta/Menus.jsx). As shown, a `Menu` object containing `Menu.Action` objects must be defined in the following schema:
```js
const action1 =
{
     text: "<action_text>",    // string, required
     icon: "<action_icon>",    // string, optional
  tooltip: "<action_tooltip>", // string, optional
  onClick: (dispatcher) => {   // required
    // do stuff
  }
}

const menu    =
{
    title: "<menu_name>",
  actions: [action1, action2, ..., actionN]
}
```
