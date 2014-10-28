(function($) {

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

    function composeChartLine(minValue, maxValue, range, postfix, configuration) {
        var elementDescription = range.label;
        var elementLink = range.link;

        var output = '<div class="range-chart-row"><div class="data-header"><a href="' + elementLink + '"><div class="header-label">'  + elementDescription + '</div></a></div>';

        var totalWidth = maxValue - minValue;
        var percentualRangeWidth = (range.max - range.min) / totalWidth * 100;
        var percentualRangeStart = (range.min - minValue) / totalWidth * 100;

        var dataInfo = '<div class="data-info"><div class="graph" style="width: ' + percentualRangeWidth + '%; left: ' + percentualRangeStart + '%;"><div class="limitbox min-value"><div class="inner">' + range.min + postfix + '</div></div><div class="limitbox max-value"><div class="inner">' + range.max + postfix + '</div></div></div></div>';
        output = output + composeLines() + dataInfo + '</div>';

        return output;
    }

    function composeChart(configuration) {
        var totalWidth = configuration.maxValue - configuration.minValue;
        var percentualRangeStart = (configuration.userValue.value - configuration.minValue) / totalWidth * 100;

        var output = '<div class="range-chart">';
        output = output + '<div class="user-value" style="left: ' + percentualRangeStart + '%"><div class="user-value-label">' + configuration.userValue.label + '</div></div>';
        output = output + composeLegend(configuration);
        if (configuration)
            for (var i = 0; i < configuration.ranges.length; i++)
                output = output + composeChartLine(configuration.minValue, configuration.maxValue, configuration.ranges[i], configuration.postfix, configuration);
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




        var containerWidth = this.width();
        var chartWidth = this.find('.range-chart').width();
        var headerWidth = containerWidth - chartWidth;
        this.find('.data-header').css('width', headerWidth + 'px');
        this.find('.data-header').css('left', '-' + headerWidth + 'px');
    };

}(jQuery));