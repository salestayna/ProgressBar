function progressBar() {
	const header = document.querySelector('.header');
	header.insertAdjacentHTML('beforebegin', '<div class="progress_bar"></div>');
	
	const progressBar = document.querySelector('.progress_bar');
	const progressBarContainer = document.createElement('div');
	progressBarContainer.classList.add('progress_bar__container');
	const progressBarParagraph = document.createElement('p');
	progressBarParagraph.classList.add('progress_bar__paragraph');
	progressBarContainer.append(progressBarParagraph);
	progressBar.append(progressBarContainer);
	
	const subtotalCart = document.querySelector('.carrinho .subtotal span:last-child');
	let cartLocalStorage = JSON.parse(localStorage.getItem('cro_lab_carrinho_cupcake'));
	if (subtotalCart === null || cartLocalStorage.empty === true) {
		progressBarParagraph.innerText = 'Faltam mais R$ 100 para o frete sair de graça!';
	} else {
		updateProgressBar();
	}
	
	function updateProgressBar() {
		let cartLocalStorage = JSON.parse(localStorage.getItem('cro_lab_carrinho_cupcake'));
		let cartTotal = cartLocalStorage.total;
		
		let subtotalProgressBar = 100 - cartTotal.toFixed(2);
		if(subtotalProgressBar <= 0) {
			progressBarParagraph.innerText = 'Parabéns! O frete é por nossa conta.';
		} else {
			progressBarParagraph.innerText = `Faltam mais ${subtotalProgressBar.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'})} para o frete sair de graça!`;
			
			//Barra de Progresso do Modal - Mobile
			const progressBarModal = document.querySelector('#sacola-lightbox .frete');
			if(progressBarModal) {
				progressBarModal.insertAdjacentHTML('beforeend', '<span class="progress_bar__paragraph--modal"></span>');
				const progressBarParagraphModal = document.querySelector('.progress_bar__paragraph--modal');
				progressBarParagraphModal.innerText = `Faltam mais ${subtotalProgressBar.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'})} para o frete grátis`;
			}
		}
		
		const widthProgressBar = (cartTotal.toFixed(2) / 100) * 100;
		progressBarContainer.style.width = 0 + '%';
		progressBarContainer.style.width = widthProgressBar + '%';
		if(widthProgressBar > 100) {
			progressBarContainer.style.width = 100 + '%';
		}
		
		shippingFree();
	}
	
	function shippingFree() {
		let cartLocalStorage = JSON.parse(localStorage.getItem('cro_lab_carrinho_cupcake'));
		
		if(cartLocalStorage) {
			let cartTotal = cartLocalStorage.total;
			
			if(cartTotal.toFixed(2) >= 100) {
				//Frete e Total - Desktop
				const shippingCart = document.querySelector('.carrinho .frete');
				shippingCart.innerText = '';
				shippingCart.classList.add('frete--gratis')
				shippingCart.innerText = 'Você ganhou frete grátis';
				
				const totalCart = document.querySelector('.carrinho .total span:last-child');
				totalCart.innerText = '';
				totalCart.innerText = cartTotal.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'});
				
	            //Frete e Total - Mobile
	            const shippingCartModal = document.querySelector('#sacola-lightbox .frete');
	            shippingCartModal.innerText = '';
	            shippingCartModal.classList.add('frete--gratis')
	            shippingCartModal.innerText = 'Você ganhou frete grátis';
	            
	            const totalCartModal = document.querySelector('#sacola-lightbox .total span:last-child');
	            totalCartModal.innerText = '';
	            totalCartModal.innerText = cartTotal.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'});
	        }
	        
	        localStorage.setItem('checkout', JSON.stringify(cartTotal));
	    }
	}
	
	document.addEventListener('click', updateProgressBar);
}

progressBar();

function checkoutCart() {
	if(window.location.href.indexOf('checkout') > -1) {
		const progressBar = document.querySelector('.progress_bar');
		progressBar.style.display = 'none';
		const header = document.querySelector('.header');
		header.style.marginTop = 0 + 'px';
	}
	
	let checkoutLocalStorage = JSON.parse(localStorage.getItem('checkout'));
	if(checkoutLocalStorage) {
		if(checkoutLocalStorage.toFixed(2) >= 100) {
			const shippingCheckout = document.querySelector('.checkout_compra .frete');
			if(shippingCheckout) {
				shippingCheckout.innerText = '';
				shippingCheckout.classList.add('frete--gratis')
				shippingCheckout.innerText = 'Você ganhou frete grátis';
			}
			
			const totalCheckout = document.querySelector('.checkout_compra .total span:last-child');
			if(totalCheckout) {
				totalCheckout.innerText = '';
				totalCheckout.innerText = checkoutLocalStorage.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'});
			}
		}
	}
	
	const continueShoppingButton = document.querySelector('.comprar_novamente .botao-voltar');
	if(continueShoppingButton) {
		continueShoppingButton.addEventListener('click', () => {
			localStorage.clear();
		});
	}
}

checkoutCart();