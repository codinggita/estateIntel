import toast from 'react-hot-toast';

class ToastNotifications {
  // Success toast
  showSuccess(message, options = {}) {
    return toast.success(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#10b981',
        color: '#ffffff',
        border: '1px solid #10b981',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        padding: '12px 16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      iconTheme: {
        primary: '#ffffff',
        secondary: '#10b981',
      },
      ...options,
    });
  }

  // Error toast
  showError(message, options = {}) {
    return toast.error(message, {
      duration: 5000,
      position: 'top-right',
      style: {
        background: '#ef4444',
        color: '#ffffff',
        border: '1px solid #ef4444',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        padding: '12px 16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      iconTheme: {
        primary: '#ffffff',
        secondary: '#ef4444',
      },
      ...options,
    });
  }

  // Loading toast
  showLoading(message, options = {}) {
    return toast.loading(message, {
      position: 'top-right',
      style: {
        background: '#3b82f6',
        color: '#ffffff',
        border: '1px solid #3b82f6',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        padding: '12px 16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      ...options,
    });
  }

  // Warning toast
  showWarning(message, options = {}) {
    return toast(message, {
      icon: '⚠️',
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#f59e0b',
        color: '#ffffff',
        border: '1px solid #f59e0b',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        padding: '12px 16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      ...options,
    });
  }

  // Info toast
  showInfo(message, options = {}) {
    return toast(message, {
      icon: 'ℹ️',
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#6366f1',
        color: '#ffffff',
        border: '1px solid #6366f1',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        padding: '12px 16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      ...options,
    });
  }

  // Dismiss specific toast
  dismiss(toastId) {
    toast.dismiss(toastId);
  }

  // Dismiss all toasts
  dismissAll() {
    toast.dismiss();
  }

  // Promise-based toast for async operations
  promise(promise, messages) {
    return toast.promise(promise, {
      loading: messages.loading || 'Processing...',
      success: messages.success || 'Success!',
      error: messages.error || 'Something went wrong',
      position: 'top-right',
      style: {
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        padding: '12px 16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    });
  }

  // Booking specific toasts
  bookingCreated(bookingId) {
    return this.showSuccess(`Booking created successfully! ID: ${bookingId}`);
  }

  bookingFailed(error) {
    const message = error?.response?.data?.message || error?.message || 'Failed to create booking';
    return this.showError(message);
  }

  paymentInitiated() {
    return this.showInfo('Payment initiated. Please wait...');
  }

  paymentSuccessful() {
    return this.showSuccess('Payment completed successfully!');
  }

  paymentFailed(error) {
    const message = error?.response?.data?.message || error?.message || 'Payment failed';
    return this.showError(message);
  }

  slotUnavailable(date, time) {
    return this.showWarning(`Slot unavailable on ${date} at ${time}. Please choose another time.`);
  }

  bookingCancelled(bookingId) {
    return this.showSuccess(`Booking ${bookingId} cancelled successfully`);
  }

  bookingUpdated(bookingId) {
    return this.showSuccess(`Booking ${bookingId} updated successfully`);
  }

  validationError(field, message) {
    return this.showError(`${field}: ${message}`);
  }

  networkError() {
    return this.showError('Network error. Please check your connection and try again.');
  }

  authenticationError() {
    return this.showError('Session expired. Please log in again.');
  }

  formValidationError(errors) {
    const firstError = Object.values(errors)[0];
    return this.showError(firstError || 'Please fix the errors in the form');
  }

  dataCopied(dataType) {
    return this.showSuccess(`${dataType} copied to clipboard!`);
  }

  dataDownloaded(dataType) {
    return this.showSuccess(`${dataType} downloaded successfully!`);
  }

  dataShared(dataType) {
    return this.showSuccess(`${dataType} shared successfully!`);
  }
}

export default new ToastNotifications();
