import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './SettingsModal.module.css';

const FOCUSABLE = 'button:not([disabled]), [href], input, select, textarea';

const SettingsModal = ({
  isOpen,
  title,
  closeLabel,
  options,
  selected,
  onSelect,
  onClose,
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previouslyFocused = document.activeElement;
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const dialog = dialogRef.current;
    const target =
      dialog.querySelector('[aria-checked="true"]') ||
      dialog.querySelector(FOCUSABLE);
    target?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      //  focus trap
      if (event.key === 'Tab') {
        const items = dialog.querySelectorAll(FOCUSABLE);
        if (!items.length) return;

        const first = items[0];
        const last = items[items.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-modal-title"
      >
        <div className={styles.header}>
          <h2 id="settings-modal-title" className={styles.title}>
            {title}
          </h2>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label={closeLabel}
          >
            ✕
          </button>
        </div>

        <div className={styles.grid} role="radiogroup" aria-label={title}>
          {options.map((option) => {
            const isSelected = option.value === selected;

            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`${styles.option} ${
                  isSelected ? styles.selected : ''
                }`}
                onClick={() => {
                  onSelect(option.value);
                  onClose();
                }}
              >
                {option.icon && (
                  <span className={styles.icon}>{option.icon}</span>
                )}

                <span className={styles.text}>
                  <span className={styles.label}>{option.label}</span>
                  {option.hint && (
                    <span className={styles.hint}>{option.hint}</span>
                  )}
                </span>

                {isSelected && <span className={styles.check}>✓</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default SettingsModal;
