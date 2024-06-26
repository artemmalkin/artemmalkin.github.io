'use strict';

class Carousel {
  constructor(el) {
    this.el = el;
    this.carouselOptions = ['previous', 'next'];
    this.carouselData = [
      {
        'id': '1',
        'src': '../img/carousel/image1.png',
        'title': 'Техническая поддержка и обслуживание',
      },
      {
        'id': '2',
        'src': '../img/carousel/image2.png',
        'title': 'Сетевые решения и коммуникации',
      },
      {
        'id': '3',
        'src': '../img/carousel/image3.png',
        'title': 'Управление ИТ-проектами и консалтинг',
      },
      {
        'id': '4',
        'src': '../img/carousel/image4.png',
        'title': 'Бизнес-аналитика и большие данные',
      }
    ];
    this.carouselInView = [1, 2, 3, 4];
    this.carouselContainer;
    this.carouselPlayState;
  }

  mounted() {
    this.setupCarousel();
  }

  // Build carousel html
  setupCarousel() {
    const container = document.createElement('div');
    const controls = document.createElement('div');

    // Add container for carousel items and controls
    this.el.append(container, controls);
    container.className = 'carousel-container';
    controls.className = 'carousel-controls';

    // Take dataset array and append items to container
    this.carouselData.forEach((item, index) => {
      const carouselItem = document.createElement('div');
      const carouselItemInfo =  document.createElement('div');
      
      carouselItem.append(carouselItemInfo);
      const carouselItemTitle =  document.createElement('div');
      // const carouselItemButton =  document.createElement('h6');
      carouselItemInfo.append(carouselItemTitle);
      // carouselItemInfo.append(carouselItemTitle, carouselItemButton);
      
      
      // Add item attributes
      carouselItem.className = `carousel-item carousel-item-${index + 1}`;
      // Used to keep track of carousel items, infinite items possible in carousel however min 5 items required
      carouselItem.setAttribute('data-index', `${index + 1}`);

      carouselItemInfo.className = "carousel-info";
      carouselItemTitle.className = "carousel-title";
      carouselItemTitle.innerText = item.title;
      // carouselItemButton.className = "btn";
      // carouselItemButton.innerText = "Подробнее"

      carouselItem.style.backgroundImage = `url('img/carousel/image${index + 1}.png')`
      carouselItem.style.backgroundSize = 'cover';
      container.append(carouselItem);
    });

    this.carouselOptions.forEach((option) => {
      const btn = document.createElement('button');
      const axSpan = document.createElement('span');

      // Add accessibilty spans to button
      axSpan.innerText = option;
      axSpan.className = 'ax-hidden';
      btn.append(axSpan);

      // Add button attributes
      btn.className = `carousel-control carousel-control-${option}`;
      btn.setAttribute('data-name', option);

      // Add carousel control options
      controls.append(btn);
    });

    // After rendering carousel to our DOM, setup carousel controls' event listeners
    this.setControls([...controls.children]);

    // Set container property
    this.carouselContainer = container;
  }

  setControls(controls) {
    controls.forEach(control => {
      control.onclick = (event) => {
        event.preventDefault();

        // Manage control actions, update our carousel data first then with a callback update our DOM
        this.controlManager(control.dataset.name);
      };
    });
  }

  controlManager(control) {
    if (control === 'previous') return this.previous();
    if (control === 'next') return this.next();

    return;
  }

  previous() {
    // Update order of items in data array to be shown in carousel
    this.carouselData.unshift(this.carouselData.pop());

    // Push the first item to the end of the array so that the previous item is front and center
    this.carouselInView.push(this.carouselInView.shift());

    // Update the css class for each carousel item in view
    this.carouselInView.forEach((item, index) => {
      this.carouselContainer.children[index].className = `carousel-item carousel-item-${item}`;
    });

    // Using the first 5 items in data array update content of carousel items in view
    this.carouselData.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
    });
  }

  next() {
    // Update order of items in data array to be shown in carousel
    this.carouselData.push(this.carouselData.shift());

    // Take the last item and add it to the beginning of the array so that the next item is front and center
    this.carouselInView.unshift(this.carouselInView.pop());

    // Update the css class for each carousel item in view
    this.carouselInView.forEach((item, index) => {
      this.carouselContainer.children[index].className = `carousel-item carousel-item-${item}`;
    });

    // Using the first 5 items in data array update content of carousel items in view
    this.carouselData.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
    });
  }
}

// Refers to the carousel root element you want to target, use specific class selectors if using multiple carousels
const el = document.querySelector('.carousel');
// Create a new carousel object
const exampleCarousel = new Carousel(el);
// Setup carousel and methods
exampleCarousel.mounted();
