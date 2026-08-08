(function () {
  const API_BASE_URL = window.JOVI_API_BASE_URL || 'http://127.0.0.1:8000';

  const STORAGE_KEYS = {
    photo: 'jovi:lastPhoto',
    analysis: 'jovi:lastAnalysis'
  };

  const ENDPOINTS = {
    resumo: '/api/resumo',
    flashcards: '/api/flashcards',
    math: '/api/math'
  };

  let cameraStream = null;
  let facingMode = 'environment';

  function showAlert(title) {
    if (typeof window.mostrarAlerta === 'function') {
      window.mostrarAlerta(title);
      return;
    }

    alert(title);
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getLastPhoto() {
    return sessionStorage.getItem(STORAGE_KEYS.photo);
  }

  function getLastAnalysis() {
    const raw = sessionStorage.getItem(STORAGE_KEYS.analysis);
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch (error) {
      return null;
    }
  }

  function storeAnalysis(analysis) {
    sessionStorage.setItem(STORAGE_KEYS.analysis, JSON.stringify(analysis));
  }

  function dataUrlToBlob(dataUrl) {
    const parts = dataUrl.split(',');
    const mimeMatch = parts[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const binary = atob(parts[1]);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    return new Blob([bytes], { type: mime });
  }

  function getResultPage(analysisType) {
    if (analysisType === 'flashcards') return 'flashcard.html';
    if (analysisType === 'math') return 'equacao.html';
    return 'resumo.html';
  }

  function navigateToResult(analysisType) {
    const fileName = getResultPage(analysisType);
    const inPagesFolder = window.location.pathname.includes('/pages/');
    window.location.href = inPagesFolder ? fileName : 'pages/' + fileName;
  }

  function setCameraMessage(message) {
    const state = document.getElementById('camera-estado');
    if (!state) return;

    state.textContent = message || '';
    state.hidden = !message;
  }

  function stopCamera() {
    if (!cameraStream) return;

    cameraStream.getTracks().forEach(function (track) {
      track.stop();
    });
    cameraStream = null;
  }

  async function startCamera() {
    const video = document.getElementById('camera-video');
    if (!video || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraMessage('Camera indisponivel neste navegador.');
      return;
    }

    stopCamera();

    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      video.srcObject = cameraStream;
      await video.play();
      setCameraMessage('');
    } catch (error) {
      setCameraMessage('Permita o acesso a camera para usar a Jovi.');
      showAlert('CAMERA INDISPONIVEL');
    }
  }

  function captureCameraFrame() {
    const video = document.getElementById('camera-video');
    const canvas = document.getElementById('camera-canvas');

    if (!video || !canvas || !video.videoWidth || !video.videoHeight) {
      throw new Error('A camera ainda nao esta pronta.');
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    sessionStorage.setItem(STORAGE_KEYS.photo, dataUrl);

    return {
      dataUrl: dataUrl,
      blob: dataUrlToBlob(dataUrl)
    };
  }

  async function sendAnalysis(analysisType, imageBlob) {
    const endpoint = ENDPOINTS[analysisType];
    if (!endpoint) {
      throw new Error('Tipo de analise invalido.');
    }

    const formData = new FormData();
    formData.append('image', imageBlob, 'captura-jovi.jpg');

    const response = await fetch(API_BASE_URL + endpoint, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      let detail = 'Nao foi possivel analisar a imagem.';
      try {
        const errorBody = await response.json();
        detail = errorBody.detail || detail;
      } catch (error) {
        detail = await response.text() || detail;
      }
      throw new Error(detail);
    }

    return response.json();
  }

  async function analyseStoredPhoto(analysisType) {
    const photo = getLastPhoto();
    if (!photo) {
      showAlert('TIRE UMA FOTO PRIMEIRO');
      return;
    }

    const activeArea = document.querySelector('.tela-celular') || document.body;
    activeArea.classList.add('em-leitura');
    showAlert('ANALISANDO...');

    try {
      const analysis = await sendAnalysis(analysisType, dataUrlToBlob(photo));
      storeAnalysis(analysis);
      navigateToResult(analysisType);
    } catch (error) {
      showAlert('ERRO NA ANALISE');
      console.error(error);
    } finally {
      activeArea.classList.remove('em-leitura');
    }
  }

  async function handleCaptureClick() {
    const visor = document.getElementById('visor-camera');
    const quadro = document.getElementById('quadro-detecao');
    let mode = null;

    if (visor && visor.classList.contains('scan-ativo')) mode = 'scan';
    if (visor && visor.classList.contains('flashcard-ativo')) mode = 'flashcards';
    if (visor && visor.classList.contains('math-ativo')) mode = 'math';

    let capture = null;

    try {
      capture = captureCameraFrame();
    } catch (error) {
      showAlert('CAMERA INDISPONIVEL');
      console.error(error);
      return;
    }

    if (quadro) {
      quadro.style.transform = 'scale(1.15)';
      setTimeout(function () {
        quadro.style.transform = 'scale(1)';
      }, 150);
    }

    if (mode === 'scan') {
      window.location.href = 'pages/scan.html';
      return;
    }

    if (mode) {
      try {
        visor.classList.add('em-leitura');
        showAlert('ANALISANDO...');
        const analysis = await sendAnalysis(mode, capture.blob);
        storeAnalysis(analysis);
        navigateToResult(mode);
        return;
      } catch (error) {
        showAlert('ERRO NA ANALISE');
        console.error(error);
      } finally {
        if (visor) {
          visor.classList.remove('em-leitura');
        }
      }
      return;
    }

    updateThumbnail(capture.dataUrl);
    showAlert('FOTO SALVA!');
  }

  function updateThumbnail(dataUrl) {
    const preview = document.getElementById('miniatura-preview');
    if (!preview) return;

    const internal = preview.querySelector('.miniatura-interna');
    if (!internal) return;

    internal.innerHTML = '<img src="' + dataUrl + '" alt="Ultima captura" class="miniatura-foto">';
  }

  function setupCameraPage() {
    const video = document.getElementById('camera-video');
    if (!video) return;

    startCamera();

    const captureButton = document.getElementById('btn-captura');
    if (captureButton) {
      captureButton.onclick = handleCaptureClick;
    }

    const rotateButton = document.getElementById('btn-girar');
    if (rotateButton) {
      rotateButton.onclick = async function () {
        facingMode = facingMode === 'environment' ? 'user' : 'environment';
        rotateButton.style.transform = 'rotate(180deg)';
        await startCamera();
        setTimeout(function () {
          rotateButton.style.transform = 'rotate(0deg)';
        }, 250);
      };
    }

    const lastPhoto = getLastPhoto();
    if (lastPhoto) updateThumbnail(lastPhoto);
  }

  function setupScanPage() {
    const preview = document.querySelector('.preview-documento img');
    if (!preview) return;

    const photo = getLastPhoto();
    if (photo) {
      preview.src = photo;
    }

    const analysisButtons = document.querySelectorAll('[data-analysis-type]');
    analysisButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        analyseStoredPhoto(button.getAttribute('data-analysis-type'));
      });
    });

    const saveButtons = document.querySelectorAll('[data-go-save], #btn-salvar-resultado');
    saveButtons.forEach(function (button) {
      button.onclick = function () {
        if (!getLastAnalysis()) {
          showAlert('GERE UMA ANALISE ANTES');
          return;
        }

        window.location.href = 'salvar.html';
      };
    });
  }

  function renderEmptyState(message) {
    const body = document.querySelector('.corpo-acao');
    if (!body) return;

    body.innerHTML = '<div class="resumo-bloco"><p class="resumo-topico-texto">' + escapeHtml(message) + '</p></div>';
  }

  function renderResumo() {
    if (!window.location.pathname.endsWith('/resumo.html')) return;

    const body = document.querySelector('.corpo-acao');
    const analysis = getLastAnalysis();
    if (!body || !analysis || analysis.analysis_type !== 'resumo') {
      renderEmptyState('Nenhum resumo foi gerado ainda. Volte para a camera e capture um scan.');
      return;
    }

    const paragraphs = String(analysis.content || 'Sem conteudo retornado.')
      .split(/\n{2,}/)
      .map(function (item) { return item.trim(); })
      .filter(Boolean);

    body.innerHTML =
      '<div class="resumo-header">' +
        '<h2 class="resumo-titulo-materia">' + escapeHtml(analysis.subject) + '</h2>' +
        '<p class="resumo-subtitulo">Resumo gerado pela Jovi</p>' +
      '</div>' +
      '<div class="resumo-bloco">' +
        '<div class="resumo-topico">' +
          '<h3 class="resumo-topico-titulo">Resumo inteligente</h3>' +
          paragraphs.map(function (paragraph) {
            return '<p class="resumo-topico-texto">' + escapeHtml(paragraph) + '</p>';
          }).join('') +
        '</div>' +
      '</div>';
  }

  function renderFlashcards() {
    if (!window.location.pathname.endsWith('/flashcard.html')) return;

    const analysis = getLastAnalysis();
    const deck = document.getElementById('flashcard-deck');
    const counter = document.getElementById('flashcard-contador');
    const container = document.getElementById('container-flashcards');

    if (!container || !analysis || analysis.analysis_type !== 'flashcards') {
      renderEmptyState('Nenhum deck foi gerado ainda. Volte para a camera e capture um scan.');
      return;
    }

    const cards = analysis.cards || [];
    if (deck) deck.textContent = analysis.subject || 'Deck Jovi';
    if (counter) counter.textContent = cards.length + (cards.length === 1 ? ' card gerado' : ' cards gerados');

    container.innerHTML = cards.map(function (card, index) {
      return (
        '<div class="card-flashcard">' +
          '<div class="card-flashcard-header">' +
            '<span class="card-flashcard-titulo">Flashcard ' + (index + 1) + '</span>' +
            '<button class="btn-flashcard-girar" title="Girar" onclick="virarFlashcard(this)">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"/><path d="M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>' +
            '</button>' +
          '</div>' +
          '<div class="card-flashcard-frente">' +
            '<p class="card-flashcard-pergunta">' + escapeHtml(card.question || 'Pergunta') + '</p>' +
          '</div>' +
          '<div class="card-flashcard-verso">' +
            '<div class="resposta-item">' +
              '<strong>Resposta</strong>' +
              '<p>' + escapeHtml(card.answer || 'Sem resposta retornada.') + '</p>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  function renderMath() {
    if (!window.location.pathname.endsWith('/equacao.html')) return;

    const analysis = getLastAnalysis();
    const container = document.getElementById('container-equacao');
    if (!container || !analysis || analysis.analysis_type !== 'math') {
      renderEmptyState('Nenhuma resolucao foi gerada ainda. Volte para a camera e capture uma equacao.');
      return;
    }

    const photo = getLastPhoto();
    const steps = analysis.steps || [];
    const results = analysis.result || [];
    const preview = photo
      ? '<img src="' + photo + '" class="img-preview-math" alt="Documento capturado" style="margin-bottom: 10px; border-radius: 8px; width: 100%; height: auto;">'
      : '<div class="equacao-linha-fake equacao" style="width: 70%;"></div>';

    container.innerHTML =
      '<div class="slide-equacao ativo">' +
        '<div class="equacao-preview-quadro">' + preview + '</div>' +
        '<div class="equacao-resolucao">' +
          '<p class="resolucao-titulo">' + escapeHtml(analysis.subject || 'Matematica') + '</p>' +
          '<div class="resolucao-sistema">' +
            '<span class="resolucao-eq">' + escapeHtml(analysis.expression || 'Nenhuma conta encontrada') + '</span>' +
          '</div>' +
          steps.map(function (step) {
            return (
              '<div class="resolucao-passo">' +
                '<span class="resolucao-passo-texto"><strong>' + escapeHtml(step.title || 'Etapa') + ':</strong> ' + escapeHtml(step.step || '') + '</span>' +
              '</div>'
            );
          }).join('') +
          results.map(function (result) {
            return '<div class="resolucao-passo"><span class="resolucao-passo-texto destaque">' + escapeHtml(result) + '</span></div>';
          }).join('') +
          '<div class="resolucao-dica">' + escapeHtml(analysis.content || '') + '</div>' +
        '</div>' +
      '</div>';

    const controls = document.querySelector('.controles-slideshow');
    if (controls) controls.style.display = 'none';
  }

  function setupSavePage() {
    const saveButton = document.getElementById('btn-confirmar-salvar');
    if (!saveButton) return;

    saveButton.onclick = async function () {
      const selected = document.querySelector('.card-materia.selecionado .materia-nome');
      const materia = selected ? selected.textContent.trim() : 'Materia';
      const analysis = getLastAnalysis();

      if (!analysis) {
        showAlert('NENHUMA ANALISE GERADA');
        return;
      }

      saveButton.disabled = true;
      saveButton.textContent = 'Salvando...';

      try {
        const response = await fetch(API_BASE_URL + '/api/salvar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ materia: materia, analysis: analysis })
        });

        if (!response.ok) {
          throw new Error('Falha ao salvar.');
        }

        showAlert('SALVO EM ' + materia.toUpperCase() + '!');
        setTimeout(function () {
          window.history.back();
        }, 1200);
      } catch (error) {
        showAlert('ERRO AO SALVAR');
        console.error(error);
      } finally {
        saveButton.disabled = false;
        saveButton.textContent = 'Salvar aqui';
      }
    };
  }

  function init() {
    setupCameraPage();
    setupScanPage();
    renderResumo();
    renderFlashcards();
    renderMath();
    setupSavePage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
