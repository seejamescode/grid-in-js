const grid = function(breakpoints, maxWidth, prefix, compat) {
  return `
    body {
      margin: 0;
    }

    .${prefix}grid,
    .${prefix}grid * {
      box-sizing: border-box;
    }

    .${prefix}grid,
    .${prefix}row {
      ${compat.DisplayFlex(`
        display: flex;
        flex-wrap: wrap;
      `)}

      ${compat.CSSVariablesOnly(`
        ${/* percentage width of item */ ""}
        --${prefix}x-col-percentage: 1;
      `)}

      ${compat.DisplayGrid(`
        ${/* column width of item */ ""}
        --${prefix}x-col-columns: 1;
        display: grid;
      `)}
    }

    .${prefix}grid .${prefix}grid,
    .${prefix}grid .${prefix}row {
      margin-left: 0;
      margin-right: 0;
      padding-left: 0;
      padding-right: 0;
    }

    ${breakpoints
      .filter(
        (breakpoint, i) =>
          i === 0 || breakpoint.margin !== breakpoints[i - 1].margin
      )
      .map(breakpoint => {
        const result = `
        .${prefix}grid {
          padding-left: ${breakpoint.margin}px;
          padding-right: ${breakpoint.margin}px;
        }
      `;

        return breakpoint.size === 0
          ? result
          : `@media (min-width: ${breakpoint.size}px) {${result}}`;
      })
      .join("")}

      ${
        maxWidth
          ? `
            @media (min-width: ${
              breakpoints.length > 0
                ? maxWidth + breakpoints.slice(-1)[0].margin * 2
                : 0
            }px) {
              .${prefix}grid {
                margin-left: auto;
                margin-right: auto;
                max-width: ${maxWidth}px;
              }
            }
            `
          : ""
      }
  `;
};

export default grid;
