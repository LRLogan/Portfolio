const DEFAULT_MESSAGES = ["A Creator", "A Developer", "A Problem Solver", "A Leader", "Logan Larrondo"];

export function createTypewriter(target, options = {}) {
  const messages = options.messages ?? DEFAULT_MESSAGES;
  const typingSpeed = options.typingSpeed ?? 75;
  const pauseBeforeDeleting = options.pauseBeforeDeleting ?? 800;
  const pauseBeforeNextMessage = options.pauseBeforeNextMessage ?? 400;

  let messageIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;
  let timer = null;

  const stop = () => {
    if (timer) {
      window.clearTimeout(timer);
      timer = null;
    }
  };

  const typeLoop = () => {
    const current = messages[messageIndex];
    target.textContent = current.substring(0, characterIndex + (isDeleting ? -1 : 1));
    characterIndex += isDeleting ? -1 : 1;

    if (!isDeleting && characterIndex === current.length) {
      timer = window.setTimeout(() => {
        isDeleting = true;
        typeLoop();
      }, pauseBeforeDeleting);
      return;
    }

    if (isDeleting && characterIndex === 0) {
      isDeleting = false;
      messageIndex = (messageIndex + 1) % messages.length;
      timer = window.setTimeout(typeLoop, pauseBeforeNextMessage);
      return;
    }

    timer = window.setTimeout(typeLoop, typingSpeed);
  };

  typeLoop();

  return { stop };
}
