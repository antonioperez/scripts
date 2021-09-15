const products = [
  {
    "name": "Aloe Vera Hydration Shot",
    "title": "Single",
    "sku": 55011
  },
  {
    "name": "Citrus 2 | Sweet Citrus",
    "title": "Single",
    "sku": 152302
  },
  {
    "name": "Chlorophyll Hydration Shot",
    "title": "Single",
    "sku": 55012
  },
  {
    "name": "Greens 3 | Greens with Ginger",
    "title": "Single",
    "sku": 152103
  },
  {
    "name": "Celery Juice",
    "title": "Single",
    "sku": 152410
  },
  {
    "name": "Citrus 1 | Refreshing Citrus",
    "title": "Single",
    "sku": 152301
  },
  {
    "name": "Chocolate Almond Milk",
    "title": "Single",
    "sku": 152502
  },
  {
    "name": "Greens 2 | Sweet Greens",
    "title": "Single",
    "sku": 152102
  },
  {
    "name": "Greens 1 | Greens",
    "title": "Single",
    "sku": 152101
  },
  {
    "name": "Elderberry Shot",
    "title": "Single",
    "sku": 200129
  },
  {
    "name": "Orange Turmeric",
    "title": "Single",
    "sku": 152602
  },
  {
    "name": "Roots 2 | Roots with Apple",
    "title": "Single",
    "sku": 152202
  },
  {
    "name": "Vitality Shot with Turmeric",
    "title": "Single",
    "sku": 200109
  },
  {
    "name": "Roots 1 | Roots with Greens",
    "title": "Single",
    "sku": 152201
  },
  {
    "name": "Roots 3 | Roots with Ginger",
    "title": "Single",
    "sku": 152203
  },
  {
    "name": "Vanilla Almond Milk",
    "title": "Single",
    "sku": 152501
  },
  {
    "name": "Vitality Shot Bundle",
    "title": "Default",
    "sku": 200133
  },
  {
    "name": "Wellness Shot with Ginger",
    "title": "Single",
    "sku": 200108
  },
  {
    "name": "Wellness Shot Bundle",
    "title": "Default",
    "sku": 200134
  },
  {
    "name": "Chocolate Banana Protein Smoothie",
    "title": "Single",
    "sku": 152510
  },
  {
    "name": "Avocado Greens Smoothie",
    "title": "Single",
    "sku": 152512
  }
]

const bleh = products.reduce((accumator, product) => {
  accumator[product.sku] = product;

  return accumator;
}, {});

console.log(Object.keys(bleh).length);