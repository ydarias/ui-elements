var rangeChart = rangeChart || {};

(function() {

    function composeLegend(configuration) {
        var range = configuration.maxValue - configuration.minValue;
        var subRange = range / 8;

        var output = '<div class="legend">';
        output = output + '<div class="label min"></div>';
        for (var i = 0; i < 7; i++) {
            var position = i + 1;
            var label = subRange * position + configuration.minValue;
            output = output + '<div class="label label-' + position + '"><div class="label-data">' + label.toFixed(2) + configuration.postfix + '</div></div>';
        }
        output = output + '<div class="label max"></div>';
        output = output + '</div>';
        return output;
    }

    function composeLines() {
        var output = '<div class="lines">';
        for (var i = 0; i < 7; i++)
            output = output + '<div class="line"></div>';
        output = output + '</div>';

        return output;
    }

    function composeChartLine(minValue, maxValue, range, postfix) {
        var totalWidth = maxValue - minValue;
        var percentualRangeWidth = (range.max - range.min) / totalWidth * 100;
        var percentualRangeStart = (range.min - minValue) / totalWidth * 100;

        var dataInfo = '<div class="data-info"><div class="graph" style="width: ' + percentualRangeWidth + '%; left: ' + percentualRangeStart + '%;"><div class="limitbox min-value"><div class="inner">' + range.min + postfix + '</div></div><div class="limitbox max-value"><div class="inner">' + range.max + postfix + '</div></div></div></div>';
        return '<div class="range-chart-row">' + composeLines() + dataInfo + '</div>';
    }

    function composeChart(configuration) {
        var output = '<div class="range-chart">';
        output = output + composeLegend(configuration);
        if (configuration)
            for (var i = 0; i < configuration.ranges.length; i++)
                output = output + composeChartLine(configuration.minValue, configuration.maxValue, configuration.ranges[i], configuration.postfix);
        output = output + '</div>';

        return output;
    }

    rangeChart.composeChart = composeChart;

})();