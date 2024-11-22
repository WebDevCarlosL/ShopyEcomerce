// components/ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error capturado:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>Algo salió mal. Por favor, inténtalo nuevamente más tarde.</h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
