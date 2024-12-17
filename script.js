// -------- Gerador de postagens -------- //
// 1. Captura de elementos
const nomeProduto = document.getElementById('nome-produto');
const valor = document.getElementById('valor');
const descricaoProduto = document.getElementById('post-body');
const botaoEnviar = document.getElementById('btn-post');
const postsContainer = document.getElementById('posts-container');
const spanError = document.getElementById('helper-text-post');

// 2. Funções
function gerarPosts(evento){
   spanError.innerText = ''
   evento.preventDefault()

   const conteudoPosts = JSON.stringify({
      produto: nomeProduto.value,
      descricao: descricaoProduto.value,
      valorProduto: valor.value
   }) 
   // console.log(conteudoPosts);

   fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
         "Content-Type": "application/json",
      },
      body: conteudoPosts
   })
   .then(function(respost){
      return respost.json()
   })
   .then(function(data){
      console.log(data)
      spanError.innerText = ''
      
      const post = document.createElement('div')
      post.classList.add('postagem');
      post.innerHTML = `
         <h3> ${data.json.produto} </h3>
         <h3>R$ ${data.json.valorProduto} </h3>
         <p> ${data.json.descricao} </p>
      `
      postsContainer.appendChild(post)
   
      // Limpar o formulário
      nomeProduto.value = ''
      descricaoProduto.value = ''
      valor.value = ''
      alert('Postagem criada com sucesso!')
   })
   
   // .then(function(data){
   //    console.log(data)
   //    spanError.innerText = ''
      
   //    const post = document.createElement('div')
   //    post.classList.add('postagem');
   //    post.innerHTML = `
   //       <h3> ${data.produto} </h3>
   //       <p> ${data.descricao} </p>
   //    `
   //    postsContainer.appendChild(post)


   //    nomeProduto.value = ''
   //    descricaoProduto.value = ''
   //    alert('Postagem criada com sucesso!')
   // })
   .catch(function(error){
      console.log(error)
      spanError.innerText = 'Não foi possível gerar a postagem'
   })
}

// 3. Eventos
botaoEnviar.addEventListener('click', (evento) => gerarPosts(evento))