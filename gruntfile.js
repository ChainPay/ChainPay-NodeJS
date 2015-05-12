

module.exports = function (grunt) {

    grunt.registerTask('test', ['lint', 'jsonlint', 'servertest', 'clienttest']);
};
