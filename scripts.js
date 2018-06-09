(function() {

  const data = {
    count: 0
  }

  let title = document.querySelector('#title');
  let caption = document.querySelector('#caption');
  const addBtn = document.querySelector('.add-btn');
  const bottomSection = document.querySelector('.bottom-section');
  const fotos = document.querySelector('.fotos');
  const favorite = document.querySelector('.favorite');
  const remove = document.querySelector('.delete');
  const noPhotos = document.querySelector('.no-photos');
  let titleVal, captionVal, file;


  addBtn.addEventListener('click', () => {

    let myFile = document.querySelector('#myFile'); 

    if(!validation()) {
      return;
    }

    titleVal = title.value;
    captionVal = caption.value; 
    file = myFile.files[0].name;

    const foto = renderFoto();
    fotos.appendChild(foto);
    data.count++;

    //check if fotos exists
    hideOrUnhideFotos();

  });


  //use event delegation to target correct clicks
  bottomSection.addEventListener('click', (e) => {

    const ele = e.target;

    //heart click
    if(ele.classList.contains('favorite')) {
      heartClickAction(ele);
    }

    //delete click
    if(ele.classList.contains('delete')) {
      removeFotoCard(ele);
      data.count--;
    }

    //check if fotos exists
    hideOrUnhideFotos();

  });


  function heartClickAction(ele) {
    //remove heart
    if(ele.classList.contains('active')) {

      //must come after removing heart logic otherwise array selection is wrong
      ele.src = `favorite.svg`;
      ele.classList.remove('active');

      const foto = ele.parentNode.parentNode;
      const parent = foto.parentNode;
      let heart = Array.from(document.getElementsByClassName('active'))
      //will be the last foto hearted
      heart = heart[heart.length-1]; 
      //get the next foto after it
      const nextFoto = heart.parentNode.parentNode.nextSibling;

      if(nextFoto) {
        parent.insertBefore(foto, nextFoto);
      } else {
        //heart foto is last child, create temp element so we can insert foto as last child, then delete the temp ele
        const tempEle = document.createElement('div');
        fotos.appendChild(tempEle);
        parent.insertBefore(foto, tempEle);
        parent.removeChild(tempEle);
      }

      


      return; //exit the event
    }

    let hearts = Array.from(document.getElementsByClassName('active'));
    const clickedFoto = ele.parentNode.parentNode;
  
    const firstChild = fotos.children[0];

    //if no hearts, make it first
    if(hearts.length === 0) {
      fotos.insertBefore(clickedFoto, firstChild);
      ele.src = `favorite-active.svg`;
      ele.classList.add('active');
      return;
    }

    const lastHeart = hearts[hearts.length-1];
    const foto = lastHeart.parentNode.parentNode;
    let after = foto.nextSibling.nextSibling;

    //only one heart
    if(hearts.length === 1) {
      after = foto.nextSibling;
      fotos.insertBefore(clickedFoto, after);
      ele.src = `favorite-active.svg`;
      ele.classList.add('active');
      return;
    }

    //last foto to get hearted. just heart it
    if(!after) {
      ele.src = `favorite-active.svg`;
      ele.classList.add('active');
      return;
    }

    //create temp
    if(after) {
      const tempEle = document.createElement('div');
      fotos.insertBefore(tempEle, after);
      fotos.insertBefore(clickedFoto, tempEle);
      fotos.removeChild(tempEle);
      ele.src = `favorite-active.svg`;
      ele.classList.add('active');
      return;
    }





    


     //heart not active, make it active and change color
     ele.src = `favorite-active.svg`;
     ele.classList.add('active');



    //get hearted fotos and make them first in line
    // let hearts = Array.from(document.getElementsByClassName('active'));

    // hearts.forEach(heart => {
    //   const foto = heart.parentNode.parentNode;
    //   const parent = foto.parentNode;
    //   const firstChild = parent.children[0];
    //   parent.insertBefore(foto, firstChild);
    // })

   
    
  }


  function removeFotoCard(ele) {
    const foto = ele.parentNode.parentNode;
    fotos.removeChild(foto);
  }

  function hideOrUnhideFotos() {
    //check if fotos exists
    if(data.count === 0) {
      noPhotos.style.display = 'block';
    } else {
      noPhotos.style.display = 'none';
    }
  }
  
  function validation() {
    if(!title.value) return false;
    if(!caption.value) return false;
    if(!myFile.files.length) return false;

    return true;
  }













  function renderFoto() {

    let foto = document.createElement('div');
    foto.classList.add('foto');

    foto.innerHTML = `<p class="foto__text">${titleVal}</p>
    <img class= "foto__img" src="photos/${file}" alt="#">
    <p class="foto__text">${captionVal}</p>
    <div class="foto-icons">
      <img class="delete" src="delete.svg" alt="#">
      <img class= "favorite" src="favorite.svg" alt="#">
    </div>`

    return foto;
  }






















})();