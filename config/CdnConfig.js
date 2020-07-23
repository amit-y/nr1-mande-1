export default {
    title: 'Deliver - CDN',
    eventTypes: [
      {
        event: 'Global',
        attributes: [
          ['appName', 'Platform'],
          ['playerVersion', 'Player'],
          ['playerName', 'Player'],
          ['contentSrc', 'Content'],
          ['countryCode', 'Geography'],
          ['contentIsLive', 'Content'],
          ['contentTitle', 'Content'],
        ],
      },
      {
        event: 'PageAction',
        eventSelector: { attribute: 'Delivery Type', value: 'Web' },
        attributes: [
          ['userAgentName', 'Platform'],
          ['userAgentOS', 'Platform'],
          ['userAgentVersion', 'Platform'],
          ['isAd', 'Content'],
          ['asnOrganization', 'Geography'],
          ['city', 'Geography'],
          ['regionCode', 'Geography'],
          ['message', 'Error'],
        ],
      },
      {
        event: 'MobileVideo',
        eventSelector: { attribute: 'Delivery Type', value: 'Mobile' },
        attributes: [
          ['isAd', 'Content'],
          ['asnOrganization', 'Geography'],
          ['city', 'Geography'],
          ['regionCode', 'Geography'],
          ['device', 'Platform'],
          ['deviceGroup', 'Platform'],
          ['deviceType', 'Platform'],
          ['osName', 'Platform'],
          ['osVersion', 'Platform'],
          ['message', 'Error'],
        ],
      },
      {
        event: 'RokuVideo',
        eventSelector: { attribute: 'Delivery Type', value: 'OTT' },
        attributes: [
          ['device', 'Platform'],
          ['deviceGroup', 'Platform'],
          ['deviceType', 'Platform'],
          ['osName', 'Platform'],
          ['osVersion', 'Platform'],
          ['errorMessage', 'Error'],
        ],
      },
    ],
    overviewConfig: [
      {
        nrql: `SELECT average(provider.error5xxErrorRate.Average) as 'Count' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
        columnStart: 1,
        columnEnd: 3,
        chartSize: 'medium',
        chartType: 'billboard',
        title: '5xx Errors',
        useSince: true,
      },
      {
        nrql: `SELECT average(provider.error5xxErrorRate.Average) as 'Count' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
        noFacet: true,
        columnStart: 4,
        columnEnd: 12,
        chartSize: 'medium',
        chartType: 'line',
        title: '5xx Errors',
        useSince: true,
      },
      {
        nrql: `SELECT average(provider.error4xxErrorRate.Average) as 'Count' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
        columnStart: 1,
        columnEnd: 3,
        chartSize: 'medium',
        chartType: 'billboard',
        title: '4xx Errors',
        useSince: true,
      },
      {
        nrql: `SELECT average(provider.error4xxErrorRate.Average) as 'Count' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
        columnStart: 4,
        columnEnd: 12,
        chartSize: 'medium',
        chartType: 'line',
        title: '4xx Errors',
        useSince: true,
      },
      {
        nrql: `SELECT rate(sum(provider.requests.Sum), 5 minute) as 'req/min' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
        columnStart: 1,
        columnEnd: 3,
        chartSize: 'medium',
        chartType: 'billboard',
        title: 'Requests per Minute',
        useSince: true,
      },
      {
        nrql: `SELECT rate(sum(provider.requests.Sum), 5 minute) as 'req/min' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
        columnStart: 4,
        columnEnd: 12,
        chartSize: 'medium',
        chartType: 'line',
        title: 'Requests per Minute',
        useSince: true,
      },
      {
        nrql: `SELECT sum(provider.requests.Sum) as 'requests' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
        columnStart: 1,
        columnEnd: 3,
        chartSize: 'medium',
        chartType: 'billboard',
        title: 'All Requests',
        useSince: true,
      },
      {
        nrql: `SELECT sum(provider.requests.Sum) as 'requests' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
        columnStart: 4,
        columnEnd: 12,
        chartSize: 'medium',
        chartType: 'line',
        title: 'All Requests',
        useSince: true,
      },
    ],
    metrics: [
      {
        title: '5xx Errors (Count)',
        threshold: {
          critical: 5,
          warning: 3,
        },
        query: {
          nrql: `SELECT average(provider.error5xxErrorRate.Average) as 'result' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
          lookup: 'result',
        },
        detailConfig: [
          {
            nrql: `SELECT average(provider.error5xxErrorRate.Average) as 'Count' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
            columnStart: 1,
            columnEnd: 3,
            chartSize: 'medium',
            chartType: 'billboard',
            title: '5xx Errors',
            useSince: true,
          },
          {
            nrql: `SELECT average(provider.error5xxErrorRate.Average) as 'Count' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
            noFacet: true,
            columnStart: 4,
            columnEnd: 12,
            chartSize: 'medium',
            chartType: 'line',
            title: '5xx Errors',
            useSince: true,
          },
          {
            nrql: `SELECT average(timeSinceLoad) as 'Player Ready Time' FROM PageAction, MobileVideo, RokuVideo WHERE actionName = 'PLAYER_READY' `,
            facets: `deviceType`,
            columnStart: 1,
            columnEnd: 3,
            chartSize: 'small',
            chartType: 'billboard',
            title: 'Player Ready Time (50%)',
            useSince: true,
          },
          {
            nrql: `FROM PageAction, MobileVideo, RokuVideo SELECT percentile(timeSinceLoad, 50) WHERE actionName = 'PLAYER_READY' TIMESERIES auto `,
            facets: `deviceType`,
            columnStart: 4,
            columnEnd: 8,
            chartSize: 'small',
            chartType: 'area',
            title: 'Player Ready Time by Device Type',
            useSince: true,
          },
          {
            nrql: `FROM PageAction, MobileVideo, RokuVideo SELECT histogram(timeSinceLoad, buckets: 10, width: 20) WHERE actionName = 'PLAYER_READY' `,
            facets: `deviceType`,
            columnStart: 9,
            columnEnd: 12,
            chartSize: 'small',
            chartType: 'heatmap',
            title: 'Player Ready Time by Device Type',
            useSince: true,
          },
          {
            nrql: `SELECT average(timeSinceLoad) as 'Player Ready Time' FROM PageAction, MobileVideo, RokuVideo WHERE actionName = 'PLAYER_READY' TIMESERIES MAX `,
            columnStart: 1,
            columnEnd: 12,
            chartSize: 'medium',
            chartType: 'scatter',
            title: 'Player Ready Time (Average)',
            useSince: true,
          },
        ],
      },
      {
        title: '4xx Errors (Count)',
        threshold: {
          critical: 10,
          warning: 5,
        },
        query: {
          nrql: `SELECT average(provider.error4xxErrorRate.Average) as 'result' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
          lookup: 'result',
        },
        detailConfig: [
          {
            nrql: `SELECT average(provider.error4xxErrorRate.Average) as 'Count' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
            columnStart: 1,
            columnEnd: 3,
            chartSize: 'medium',
            chartType: 'billboard',
            title: '4xx Errors',
            useSince: true,
          },
          {
            nrql: `SELECT average(provider.error4xxErrorRate.Average) as 'Count' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
            columnStart: 4,
            columnEnd: 12,
            chartSize: 'medium',
            chartType: 'line',
            title: '4xx Errors',
            useSince: true,
          },
        ],
      },
      {
        title: 'Requests per Minute (Rate)',
        threshold: {
          critical: 1,
          warning: .05,
        },
        query: {
          nrql: `SELECT rate(sum(provider.requests.Sum), 5 minute) as 'result' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
          lookup: 'result',
        },
        detailConfig: [
          {
            nrql: `SELECT rate(sum(provider.requests.Sum), 5 minute) as 'req/min' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
            columnStart: 1,
            columnEnd: 3,
            chartSize: 'medium',
            chartType: 'billboard',
            title: 'Requests per Minute',
            useSince: true,
          },
          {
            nrql: `SELECT rate(sum(provider.requests.Sum), 5 minute) as 'req/min' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
            columnStart: 4,
            columnEnd: 12,
            chartSize: 'medium',
            chartType: 'line',
            title: 'Requests per Minute',
            useSince: true,
          },
        ],
      },
      {
        title: 'All Requests',
        threshold: {
          critical: 1000,
          warning: 1250,
          type: 'below',
        },
        invertCompareTo: 'true',
        query: {
          nrql: `SELECT sum(provider.requests.Sum) as 'result' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
          lookup: 'result',
        },
        detailConfig: [
          {
            nrql: `SELECT sum(provider.requests.Sum) as 'requests' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
            columnStart: 1,
            columnEnd: 3,
            chartSize: 'medium',
            chartType: 'billboard',
            title: 'All Requests',
            useSince: true,
          },
          {
            nrql: `SELECT sum(provider.requests.Sum) as 'requests' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
            columnStart: 4,
            columnEnd: 12,
            chartSize: 'medium',
            chartType: 'line',
            title: 'All Requests',
            useSince: true,
          },
        ],
      },
      {
        title: 'Downloaded Bytes (MB)',
        threshold: {
          critical: 275,
          warning: 300,
          type: 'below',
        },
        invertCompareTo: 'true',
        query: {
          nrql: `SELECT sum(provider.bytesDownloaded.Sum/1000000) as 'result' FROM LoadBalancerSample WHERE providerAccountId = '36376' and provider = 'CloudFrontDistribution'`,
          lookup: 'result',
        },
        detailConfig: [
          {
            nrql: `FROM PageAction, MobileVideo, RokuVideo SELECT filter(sum(timeSinceBufferBegin), WHERE actionName = 'CONTENT_BUFFER_END' and contentPlayhead > 0) / filter(sum(playtimeSinceLastEvent), WHERE contentPlayhead is not null) * 100 as '%' `,
            columnStart: 1,
            columnEnd: 3,
            chartSize: 'small',
            chartType: 'billboard',
            title: 'Rebuffering Ratio',
            useSince: true,
          },
          {
            nrql: `FROM PageAction, MobileVideo, RokuVideo SELECT sum(timeSinceBufferBegin)/1000 as 'Total Buffering' WHERE actionName = 'CONTENT_BUFFER_END' and contentPlayhead > 0 FACET viewId LIMIT 25 `,
            noFacet: true,
            columnStart: 4,
            columnEnd: 12,
            chartSize: 'small',
            chartType: 'bar',
            title: 'Sessions with most Rebuffering, Seconds (Click for details)',
            useSince: true,
            click: 'openSession',
          },
          {
            nrql: `FROM PageAction, MobileVideo, RokuVideo SELECT filter(sum(timeSinceBufferBegin), WHERE actionName = 'CONTENT_BUFFER_END' and contentPlayhead > 0) / filter(sum(playtimeSinceLastEvent), WHERE contentPlayhead is not null) * 100 as '%' TIMESERIES MAX `,
            facets: `deviceType`,
            columnStart: 1,
            columnEnd: 12,
            chartSize: 'small',
            chartType: 'area',
            title: 'Rebuffering Ratio by Device Type',
            useSince: true,
          },
          {
            nrql: `FROM PageAction, MobileVideo, RokuVideo SELECT percentile(timeSinceBufferBegin/1000, 50) as 'seconds', percentile(timeSinceBufferBegin/1000, 90) as 'seconds', percentile(timeSinceBufferBegin/1000, 95) as 'seconds', percentile(timeSinceBufferBegin/1000, 99) as 'seconds' WHERE actionName = 'CONTENT_BUFFER_END' and contentPlayhead = 0 `,
            columnStart: 1,
            columnEnd: 4,
            chartSize: 'medium',
            chartType: 'billboard',
            title: 'Initial Buffer Time',
            useSince: true,
          },
          {
            nrql: `FROM PageAction, MobileVideo, RokuVideo SELECT percentile(timeSinceBufferBegin/1000, 50) as 'seconds', percentile(timeSinceBufferBegin/1000, 90) as 'seconds', percentile(timeSinceBufferBegin/1000, 95) as 'seconds', percentile(timeSinceBufferBegin/1000, 99) as 'seconds' WHERE actionName = 'CONTENT_BUFFER_END' and contentPlayhead = 0 TIMESERIES MAX `,
            facets: '',
            columnStart: 5,
            columnEnd: 12,
            chartSize: 'medium',
            chartType: 'area',
            title: 'Initial Buffer Time',
            useSince: true,
          },
        ],
      },
    ],
  }
  