import checkGPS from "./checkGPS";
import sendGPS from "./sendGPS";
import getGeolocation from "./getGeolocation";

export default class Widget {
  constructor() {
    this.container = document.querySelector(".container");
    this.popover = document.querySelector(".popover");
    this.inputMessage = document.querySelector(".news__input");
    this.inputPopover = document.querySelector(".popover__input");
    this.error = document.querySelector(".error");
    this.messages = [];
    this.location = null;
  }

  renderMessage(text) {
    return `
    <div class="message">
      <p>${text}</p>
      <span class="geolocation">[${this.location.latitude}, ${this.location.longitude}]</span>
    </div>
    `;
  }

  renderMessagesList() {
    const newsList = document.querySelector(".news_list");
    newsList.innerHTML = "";
    this.messages.forEach((ele) => {
      newsList.innerHTML += this.renderMessage(ele);
    });
  }

  /** Если потребуется узнавать местоположение один раз при открытии страницы */
  init() {
    getGeolocation()
      .then((position) => {
        this.location = {
          latitude: position.coords.latitude.toFixed(5),
          longitude: position.coords.longitude.toFixed(5),
        };
      })
      .catch((e) => {
        console.error(e);
      });
  }

  addListener() {
    this.container.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const { target } = evt;

      if (target.classList.contains("news__form")) {
        this.messages.push(this.inputMessage.value);
        getGeolocation()
          .then((position) => {
            this.location = {
              latitude: position.coords.latitude.toFixed(5),
              longitude: position.coords.longitude.toFixed(5),
            };
            if (this.location) {
              this.renderMessagesList();
              this.inputMessage.value = "";
            }
          })
          .catch(() => {
            Widget.renderElement(this.popover);
          });
      }

      if (target.classList.contains("popover__form")) {
        this.inputPopover.value = "57.62607, 39.88447";
        const { value } = this.inputPopover;

        if (checkGPS(value)) {
          this.location = sendGPS(value);
          Widget.hiddenElement(this.popover);
          this.renderMessagesList();
          this.inputMessage.value = "";
        } else {
          Widget.renderElement(this.error);
        }
      }
    });

    this.inputPopover.addEventListener("input", () => {
      Widget.hiddenElement(this.error);
    });
  }

  static renderElement(ele) {
    ele.classList.remove("hidden");
  }

  static hiddenElement(element) {
    element.classList.add("hidden");
  }
}
