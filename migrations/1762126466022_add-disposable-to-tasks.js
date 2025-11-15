exports.up = (pgm) => {
  pgm.addColumn("tasks", {});
};

exports.down = (pgm) => {
  pgm.dropColumn("tasks", "disposable");
};
