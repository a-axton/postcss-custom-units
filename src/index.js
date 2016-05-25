import postcss from 'postcss';
import _ from 'lodash';

export default postcss.plugin('postcss-custom-units', ({ containerWidth = 1140, columns = 12, base = 16 } = {}) => {
  const unitsRegExp = /([+-]?(?:\d+|\d*\.\d+))(gw|cw|gu)/g;
  const calcUnits = {
    cw: (units) => (units * 0.01 * containerWidth),
    gw: (units) => (100 / columns * units * 0.01 * containerWidth),
    gu: (units) => {
      units = units < 0 ? (units + 1) * -1 : units - 1;
      if (units === 0) {
        return base;
      } else if (units > 0) {
        return Math.pow(1.61803398875, units) * base;
      } else if (units < 0) {
        return Math.pow(1.61803398875, units) * base * -1;
      }
    }
  };
  const calcMediaQueryUnits = {
    cw: (units) => units,
    gw: (units) => (100 / columns * units)
  };
  const formatUnit = (units, type) => (Math.round(units) + type);

  return (css, result) => {
    const mediaAtRule = postcss.atRule({
      name: 'media',
      params: 'and (max-width: 1140px)'
    });

    css.walkRules((rule) => {
      let units = rule.nodes.filter((node) => {
        unitsRegExp.lastIndex = 0;
        return unitsRegExp.test(node.value);
      });

      if (!units.length) { return; }

      let mediaRule = postcss.rule({
        selector: rule.selector
      });

      units.forEach((decl) => {
        decl.value = decl.value.replace(unitsRegExp, (match, value, unit) => {
          value = parseFloat(value);

          if (calcMediaQueryUnits[unit]) {
            mediaRule.append(postcss.decl({
              prop: decl.prop,
              value: formatUnit(calcMediaQueryUnits[unit](value), 'vw')
            }));
          }

          if (value === 0) {
            return '0px';
          }

          return formatUnit(calcUnits[unit](value), 'px');
        });
      });

      mediaAtRule.append(mediaRule);
    });

    css.prepend(mediaAtRule);

    return result;
  };
});
