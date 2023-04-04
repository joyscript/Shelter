const getData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const shuffleArr = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateCard = (pet) => {
  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
      <div class="card__pic">
        <img src="${pet.img}" alt="Pet ${pet.name}" />
      </div>
      <div class="card__content">
        <h3 class="card__title">${pet.name}</h3>
        <button class="button">Learn more</button>
      </div>
    `;

  return card;
};

export { getData, shuffleArr, generateCard };
