# pulse-sdk

On going POC for a PulseLife search SDK

## Integration

Copy paste the following code in your HTML head section


```
<!DOCTYPE html>
...
<head>
    ...
    <script>
        !function(e,s,t,n){e.Pulse=n,e[n]=e[n]||function(){(e[n].q=e[n].q||[]).push(arguments)};let c=s.createElement("script"),r=s.getElementsByTagName("script")[0];c.async=!0,c.src=t,r.parentNode.insertBefore(c,r)}(window,document,"https://sdk.360medics.com/sdk/v1/bundle.js","pulse");

        pulse('init', 'YOUR CLIENT API KEY')
        pulse('render', 'my-widget')
    </script>
</head>
<body>
    <div id="my-widget"></div>
</body>
</html>
```

## Tech

- Webpack & petite-vue
- Main resource: https://sdk-design.js.org/