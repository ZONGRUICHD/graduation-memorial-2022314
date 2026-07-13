import { useEffect, useRef } from 'react'

const focusableSelector = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'details > summary:first-of-type',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

type ScrollStyles = {
  bodyOverflow: string
  bodyPaddingRight: string
  rootOverflow: string
}

let modalCount = 0
let savedScrollStyles: ScrollStyles | null = null

function lockPageScroll() {
  if (modalCount === 0) {
    const body = document.body
    const root = document.documentElement
    savedScrollStyles = {
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
      rootOverflow: root.style.overflow,
    }

    const viewportWidth = root.clientWidth
    const scrollbarWidth = viewportWidth > 0 ? window.innerWidth - viewportWidth : 0
    if (scrollbarWidth > 0) {
      const currentPadding = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0
      body.style.paddingRight = `${currentPadding + scrollbarWidth}px`
    }

    body.style.overflow = 'hidden'
    root.style.overflow = 'hidden'
    body.dataset.modalOpen = 'true'
  }

  modalCount += 1

  return () => {
    modalCount = Math.max(0, modalCount - 1)
    if (modalCount !== 0 || savedScrollStyles === null) return

    document.body.style.overflow = savedScrollStyles.bodyOverflow
    document.body.style.paddingRight = savedScrollStyles.bodyPaddingRight
    document.documentElement.style.overflow = savedScrollStyles.rootOverflow
    delete document.body.dataset.modalOpen
    savedScrollStyles = null
  }
}

function focusWithoutScrolling(element: HTMLElement) {
  try {
    element.focus({ preventScroll: true })
  } catch {
    element.focus()
  }
}

function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter((element) => (
    !element.hidden
    && element.getAttribute('aria-hidden') !== 'true'
    && !element.closest('[hidden], [inert], [aria-hidden="true"]')
  ))
}

/**
 * Supplies modal focus management shared by the archive overlays.
 * The dialog element must be mounted for the lifetime of the hook.
 */
export function useModalDialog<T extends HTMLElement>(onClose: () => void, getExplicitReturnFocus?: () => HTMLElement | null) {
  const dialogRef = useRef<T>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog === null) return

    const returnFocus = getExplicitReturnFocus?.() ?? (document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null)
    const unlockPageScroll = lockPageScroll()
    const initialFocus = dialog.querySelector<HTMLElement>('[data-dialog-initial-focus]')
      ?? getFocusableElements(dialog)[0]
      ?? dialog

    focusWithoutScrolling(initialFocus)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = getFocusableElements(dialog)
      if (focusableElements.length === 0) {
        event.preventDefault()
        focusWithoutScrolling(dialog)
        return
      }

      const first = focusableElements[0]
      const last = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement

      if (event.shiftKey && (activeElement === first || !dialog.contains(activeElement))) {
        event.preventDefault()
        focusWithoutScrolling(last)
      } else if (!event.shiftKey && (activeElement === last || !dialog.contains(activeElement))) {
        event.preventDefault()
        focusWithoutScrolling(first)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      unlockPageScroll()
      window.requestAnimationFrame(() => {
        if (returnFocus?.isConnected && !returnFocus.closest('[inert]')) {
          focusWithoutScrolling(returnFocus)
        }
      })
    }
  }, [getExplicitReturnFocus])

  return dialogRef
}
