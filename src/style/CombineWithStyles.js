import { withStyles } from '@material-ui/core/styles';

function CombineWithStyles(...styles) {
  function combineStyles() {
    return function CombineStyles(theme) {
      const outStyles = styles.map((arg) => {
        if (typeof arg === 'function') {
          return arg(theme);
        }
        return arg;
      });
      
      return outStyles.reduce((acc, val) => Object.assign(acc, val));
    };
  }
  
  return withStyles(combineStyles(...styles), { withTheme: true });
  
}

export default CombineWithStyles;