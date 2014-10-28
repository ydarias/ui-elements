var uiElements = uiElements || {};

uiElements.rangeChart = uiElements.rangeChart || {};

(function(){

    uiElements.rangeChart.applyLineHoverEffects = function($container) {
        if (typeof $ == 'undefined')
            console.log("ERROR: jQuery is not loaded or it is not accesible");

        var onHoverIn = function() {
            $(this).find('.limitbox').show(100);
        };

        var onHoverOut = function() {
            $(this).find('.limitbox').hide(100);
        };

        $container.find('.range-chart-row').hover(onHoverIn, onHoverOut);
    };

    uiElements.rangeChart.calculateBaselinePosition = function($container) {
        var space = 20;
        var baselineHeight = $container.height() - space;
        var $baseline = $container.find('.baseline');

        $baseline.css('height', baselineHeight + 'px');
        $baseline.css('top', space + 'px');
    };

    uiElements.rangeChart.calculateHeaderWidth = function($container) {
        var chartWidth = $container.find('.range-chart').width();
        var headerWidth = $container.width() - chartWidth;
        var $dataHeader = $container.find('.data-header');

        $dataHeader.css('width', headerWidth + 'px');
        $dataHeader.css('left', '-' + headerWidth + 'px');
    };

})();

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
        output = output + '<div class="baseline" style="left: ' + percentualRangeStart + '%"><div class="baseline-label">' + configuration.userValue.label + '</div></div>';
        output = output + composeLegend(configuration);
        if (configuration)
            for (var i = 0; i < configuration.ranges.length; i++)
                output = output + composeChartLine(configuration.minValue, configuration.maxValue, configuration.ranges[i], configuration.postfix, configuration);
        output = output + '</div>';

        return output;
    }

    $.fn.rangeChart = function(configuration) {
        this.html(composeChart(configuration));

        uiElements.rangeChart.applyLineHoverEffects(this);
        uiElements.rangeChart.calculateBaselinePosition(this);
        uiElements.rangeChart.calculateHeaderWidth(this);
    };

}(jQuery));