import React, { Component } from 'react';
import PropTypes from 'prop-types';

const isEmbedable = url => url && url.includes('www.youtube.com');

class MediaPreview extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
  }

  static defaultProps  = {
    alt: 'img preview'
  }



  render() {
    const {url, alt} = this.props;
    if (isEmbedable(url)) {
      let src = url.replace(/www.youtube.com\/watch/i, 'www.youtube.com/embed')
      return (
        <iframe
          title="Intentionally blank"
          aria-hidden="true"
          src={src}
          frameBorder="0"
          allowFullScreen></iframe>
      );
    }
    return (
      <div className='d-flex flex-column align-items-center pt-2 pb-2'>
        <img style={{width: '95%'}} src={url} alt={alt} />
      </div>
    );
  }
}

export {isEmbedable};
export default MediaPreview;
