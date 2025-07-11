import ReactPixel from 'react-facebook-pixel';

export default function useFacebookPixel() {
  React.useEffect(() => {
    ReactPixel.init('YOUR_PIXEL_ID'); // replace with your Pixel ID
    ReactPixel.pageView();
  }, []);
}
