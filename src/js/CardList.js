class CardList {
  constructor(container, card, api) {
    this.container = container;
    this.card = card;
    this.api = api;
  }

  addCard(name, link) {
    const temopolateCard = this.card.create({ name: name, link: link });
    this.container.insertAdjacentHTML('beforeend', temopolateCard);
  }

  render() {
    this.api.getInitialCards().then(res => {
      for (const element of res) {
        this.addCard(element.name, element.link);
      }
    });
  }

  setListeres() {
    this.container.addEventListener('click', this.card.like);
    this.container.addEventListener('click', function (event) { this.card.remove(event, this.container) }.bind(this));
  }

  sendCardToServer(name, link) {
    return this.api.sendCard(name, link)
      .then((res) => {
        if (res) {
          this.addCard(name, link)
        }
        return res;
      });
  }

}



