export default function Bubble(options) {
  this.type = 'bobomb';
  this.value = options.value;
  this.row = options.row;
  this.col = options.col;
  this.isPopAnimationActive = false;
  this.disabled = false;
  this.directions = [
    { top: 0, left: -1, label: 'left', animation: false },
    { top: -1, left: 0, label: 'top', animation: false },
    { top: 0, left: 1, label: 'right', animation: false },
    { top: 1, left: 0, label: 'bottom', animation: false },
    { top: -1, left: -1, label: 'topLeft', animation: false },
    { top: -1, left: 1, label: 'topRight', animation: false },
    { top: 1, left: 1, label: 'bottomLeft', animation: false },
    { top: 1, left: -1, label: 'bottomRight', animation: false },
  ];
}
