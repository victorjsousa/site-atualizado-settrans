// Menu mobile toggle
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('.nav-links a'); // Seleciona todos os links de navegação

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isExpanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('active');
      // Adiciona ou remove o atributo aria-hidden para a navegação
      nav.setAttribute('aria-hidden', isExpanded);
    });

    // Fecha o menu ao clicar em um link (para mobile)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
          burger.setAttribute('aria-expanded', 'false');
          nav.setAttribute('aria-hidden', 'true');
        }
      });
    });
  }

  // Função genérica para lidar com o envio de formulários
  const handleFormSubmit = (formId, successMessage) => {
    const form = document.getElementById(formId);
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Previne o envio padrão do formulário

        // Exemplo de como você enviaria os dados para um servidor
        // const formData = new FormData(form);
        // try {
        //   const response = await fetch('/api/submit-form', { // Substitua pela sua URL de API
        //     method: 'POST',
        //     body: formData,
        //   });
        //   if (response.ok) {
        //     alert(successMessage);
        //     form.reset();
        //   } else {
        //     alert('Ocorreu um erro ao enviar. Tente novamente.');
        //   }
        // } catch (error) {
        //   console.error('Erro no envio do formulário:', error);
        //   alert('Ocorreu um erro de rede. Tente novamente.');
        // }

        // Para este exemplo, apenas o alert e reset
        alert(successMessage);
        form.reset();

        // Se for o formulário de currículo, resetar o texto do input de arquivo
        if (formId === 'form-trabalhe') {
          const fileNameSpan = form.querySelector('.file-name');
          if (fileNameSpan) {
            fileNameSpan.textContent = 'Anexar Currículo (PDF, DOC, DOCX)';
          }
        }
      });
    }
  };

  // Inicializa os manipuladores de formulário
  handleFormSubmit('form-contato', 'Mensagem enviada com sucesso! Entraremos em contato em breve.');
  handleFormSubmit('form-trabalhe', 'Currículo enviado! Obrigado pelo interesse em trabalhar conosco.');

  // Atualiza o nome do arquivo selecionado no input de arquivo
  const curriculoFileInput = document.getElementById('curriculo-file');
  if (curriculoFileInput) {
    curriculoFileInput.addEventListener('change', function() {
      const fileNameSpan = this.closest('.file-input-label').querySelector('.file-name');
      if (this.files.length > 0) {
        fileNameSpan.textContent = this.files[0].name;
      } else {
        fileNameSpan.textContent = 'Anexar Currículo (PDF, DOC, DOCX)';
      }
    });
  }
});
