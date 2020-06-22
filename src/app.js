const name = prompt("¡Dime tu nombre!");
const controller = new ControllerWhoIsWho(
  new ViewController(window.document),
  new ServiceWhoIsWho(name)
);
