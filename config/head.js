export default {
  title: process.env.npm_package_name || '',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: process.env.npm_package_description || ''
    }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    {
      rel: 'stylesheet',
      href: 'https://cdn.snipcart.com/themes/v3.0.15/default/snipcart.css'
    }
  ],
  script: [
    {
      src: 'https://identity.netlify.com/v1/netlify-identity-widget.js',
      defer: true,
      id: 'netlify-identity-widget-script'
    },
    { src: 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js' },
    {
      src: 'https://cdn.snipcart.com/scripts/2.0/snipcart.js',
      id: 'snipcart',
      'data-api-key': 'SMCvrpo2j2gnL9DLXVBP2gtt-68074-H5SKBSpzHA_gYBPSxVzN'
    }
  ]
}
