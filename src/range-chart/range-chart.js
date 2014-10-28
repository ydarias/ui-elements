(function($) {

    function composeHeader(configuration) {
        var output = '<div class="header-range-chart"><div class="legend-description">' + configuration.legendDescription + '</div>';
        for (var i = 0; i < configuration.ranges.length; i++) {
            var elementDescription = configuration.ranges[i].label;
            var elementLink = configuration.ranges[i].link;
            output = output + '<a href="' + elementLink + '"><div class="element-description">'  + elementDescription + '</div></a>';
        }
        output = output + '</div>';

        return output;
    }

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
        for (var i = 0; i < 7; i++) {
            var position = i + 1;
            output = output + '<div class="line col-' + position + '"></div>';
        }
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
        var totalWidth = configuration.maxValue - configuration.minValue;
        var percentualRangeStart = (configuration.userValue.value - configuration.minValue) / totalWidth * 100;

        var output = composeHeader(configuration);

        output = output + '<div class="range-chart">';
        output = output + '<div class="user-value" style="left: ' + percentualRangeStart + '%"><div class="user-value-label">' + configuration.userValue.label + '</div></div>';
        output = output + composeLegend(configuration);
        if (configuration)
            for (var i = 0; i < configuration.ranges.length; i++)
                output = output + composeChartLine(configuration.minValue, configuration.maxValue, configuration.ranges[i], configuration.postfix);
        output = output + '</div>';

        return output;
    }

    $.fn.rangeChart = function(configuration) {
        this.html(composeChart(configuration));

        var $chart = this.find('.range-chart-row');
        if ($chart) {
            $chart.hover(
                function onHoverIn() {
                    $(this).find('.limitbox').show(100);
                },
                function onHoverOut() {
                    $(this).find('.limitbox').hide(100);
                }
            );

        } else {
            console.log("ERROR: there is not .range-chart-row defined");
        }

        var space = 20;
        var containerHeight = this.find('.range-chart').height();
        var baselineHeight = containerHeight - space;
        this.find('.user-value').css('height', baselineHeight + 'px');
        this.find('.user-value').css('top', space + 'px');
    };

}(jQuery));