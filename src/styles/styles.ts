export const LoaderStyle = {
  // width: "100px !important",
  // height: "100px !important",
  zIndex: "10",
  position: "relative"
}
export const ContainerStyle = {
  display: "flex",
  justifyContent: "center",
  maxWidth: "1200px",
  height: "697px",
  margin: "0 auto",
  alignItems: "center",
}
export const BgBlur = {
  position: "absolute",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  background: "#fff",
  filter: "blur(10px)"
}

export const ButtonStyles = (theme) => `
      text-transform: inherit;
      width:auto;
      min-width:auto;
      height:43px;
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
      color:  ${theme.colors.primary[100]};
      transition: all 0.4s ease;
      cursor: pointer;
      border-radius: 4px;

      &.MuiButton-bordered__btn {
        width:100px;
        height:40px;
        color:${theme.colors.gray[700]};
        background-color: white;
        padding:0 20px ;
        position:relative;
        border: 1.7px solid transparent;

        &::before{
          content:"";
          position:absolute;
          right:0;
          top:0;
          width:100%;
          height:105%;
          border: 1.7px solid ${theme.colors.gray[300]};
          border-radius: ${theme.shape.button.borderRadius}px !important;
        }
        
        &:hover::before{
          border: 2.5px solid ${theme.colors.gray[300]};  
        } 
      }

      &.MuiButton-bordered__btn--explore{
        color: #303030;
        background-color: #fff;
        padding:9px 16px;
        position:relative;
        border: 1.7px solid #B3B3B3;
        border-radius: 4px;

        &:hover{
          border-color: #686868;
        } 
      }

      &.MuiButton-bordered__btn--signup{
        color: #303030;
        background-color: #fff;
        padding:9px 16px;
        position:relative;
        border: 1.7px solid #B3B3B3;
        border-radius: 4px;

        &:hover{
          border-color: #686868;
        } 
      }

      &.MuiButton-search__btn{
        color:#FFFFFF;
        background-color: #7210BE;
        padding:23px 16px;
        position: absolute;
        top: -1%;
        right: -1%;
        border: 1.7px solid #7210BE;
        border-radius: 4px;

        &:hover{
          background: #9E35EE;
          border-color: #9E35EE;
        } 
      }

      &.MuiButton-upload__btn{
        color:#FFFFFF;
        background-color: #7210BE;
        padding:11px 16px;
        border-radius: 4px;

        img {
          margin-right: 8px;
        }

        &:hover{
          background: #9E35EE;
        } 
      }

      &.MuiButton-cancel__btn{
        color:#292929;
        background-color: #f5f5f5;
        padding:10px 24px;
        border-radius: 4px;

        &:hover{
          background: #f2f2f2;
        } 
      }
      &.MuiButton-confirm__btn{
        color:#fff;
        background-color: #DA1515;
        padding:10px 24px;
        border-radius: 4px;

        .MuiButton-startIcon {
          margin-right: 0;
          margin-left: 0;
        }

        &:hover{
          background: #ea2e2e;
        } 
      }

      &.MuiButton-login__btn {
        height:40px;
        border: 1.7px solid ${theme.colors.gray[900]};
        color:white;
        background-color: ${theme.colors.gray[900]};
        padding:0 20px ;
        border-radius:4px;
        
        img {
          margin-right: 8px;
        }

        &:hover{
          background-color:${theme.colors.gray[700]};
          border-color: ${theme.colors.gray[700]};
          
        }   

        &--disabled {
          height:40px;
          border: 1.7px solid ${theme.colors.gray[500]};
          color:white;
          background-color: ${theme.colors.gray[500]};
          padding:0 20px ;
          border-radius:4px;
        }
      } 

      &.MuiButton-borderless__btn {
        height :40px;
        color: #686868;
        padding: 0 20px ;
        border-radius: 4px;
        
        &:hover{
          background-color: #F5F5F5;
        }
      } 

      &.MuiButton-underlined__btn {
        min-width:30px;
        padding:0;
        font-size: 13px;
        line-height: 22px;
        height:auto;
        color: #1D5BF9;
        border-bottom: 1.5px solid #B7CBFD;
        background:transparent;
        border-radius:0;
        &:hover{
          background-color:white;
          border-color: ${theme.colors.gray[700]};
        }  
      }

      &.MuiButton-signIn__btn{
        width:100%;
        background: #7210BE;
        color:#fff;

        &:hover{
          background: #9E35EE;  
        }

        &:disabled{
          background: #E0E0E0;
          color: #686868; 
        }
      }

      &.MuiButton-download__zip--file{
        width:100%;
        padding: 9px 12px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        margin-bottom: 10px;
        justify-content: start;
        gap: 10px;
        text-align: start;
        height:auto;
        cursor:text;
        flex-direction:column;
        align-items: start;
        background:transparent !important;
      }


      &.MuiButton-download-small__zip--file{
        width:100%;
        padding: 2px 8px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        justify-content: start;
        gap: 10px;
        text-align: start;
        height:auto;
        cursor:text;
        flex-direction:column;
        align-items: start;
        margin-bottom: 10px;
      }

      &.MuiButton-download__model{
        width: 100%;
        background: #7210BE;
        border-radius: 4px;
        font-size: 16px;
        line-height: 22px;
        text-align: center;
        color: #fff;
        &--model {
          width: 100%;
          background: #7210BE;
          border-radius: 4px;
          color: #fff;
        }
        &:hover{
          background: #9E35EE;
        }
        &--disabled{
          pointer-events: none;
          width: 258px;
          background: #7210BE;
          border-radius: 4px;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          color: #fff;
          }
      }

      &.MuiButton-slider__right--arrow{
        position: absolute;
        z-index: 10;
        top:50%;
        right:1%;
        transform: translateY(-50%);
        min-width: 44px;  
        height:44px;
        padding:0;
        border-radius: 22px;
        background: rgba(250, 250, 250, 0.3);
        &:hover {
          background: rgba(250, 250, 250, 0.6);
        }
      }
      
      &.MuiButton-slider__left--arrow{
        position: absolute;
        z-index: 10;
        top:50%;
        left:1%;
        transform: translateY(-50%);
        min-width: 44px;
        height:44px;
        padding:0;
        border-radius: 22px;
        background: rgba(250, 250, 250, 0.3);
        &:hover {
          background: rgba(250, 250, 250, 0.6);
        }
      }
      
      &.MuiButton-slider_close__button{
        position: absolute;
        z-index: 10;
        top: 1%;
        right: 1%;
        min-width: 44px;
        height:44px;
        padding:0;
        border-radius: 22px;
        background: rgba(250, 250, 250, 0.3);
        &:hover {
          background: rgba(250, 250, 250, 0.6);
        }
      }

      &.MuiButton-explore__btn{
        border: 1.7px solid #B3B3B3;
        border-radius: 4px;
        padding: 9px 16px;
        color: #303030;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
      }

      &.MuiButton-colors__btn{
        width: 26px;
        height: 26px;
        border-radius:50%;
        min-width: 26px;
        margin-bottom:9px;
        position: relative;

        .btn__check{
          opacity:0
        }

        &:not(:last-child){
          margin-right:13px
        }

        &:hover::before {
          opacity:1;
        }

        &::before{
          content:"";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 32px;
          height: 32px;
          border: 2px solid #cd96f6;
          border-radius:50%;
          opacity:0;
          transition: all 0.4s ease;
        }
      }

      &.colors__active--btn::before{
        opacity:1
      }

      &.colors__active--btn .btn__check{
        opacity: 1  
      }

      &.MuiButton-not-found__btn{
        padding:9px 20px;
        border-radius: 4px;
        background: #141414;
        font-weight: 500;
        font-size: 16px;
        line-height: 140%;
        color: #fff;
        display:flex;
        align-items: center;
        cursor:pointer;

        span{
          margin-right:10px !important;
        }
        
      }

      &.MuiButton-bookmark__btn{
        padding:9px 12px;
        color: #303030;
        background-color: #fff;
        position:relative;
        border: 1.7px solid #B3B3B3;
        border-radius: 4px;

        &:hover{
          border-color: #686868;
        } 

        img{
          margin-right: 8px;
        }
      }

      &.MuiButton-bookmark__btn--disabled{
        padding:9px 12px;
        background-color: #F5F5F5;
        color: #848484;
        cursor: not-allowed;
        pointer-events: none;
        position:relative;
        border: 1.7px solid #E0E0E0;
        border-radius: 4px;

        img{
          margin-right: 8px;
        }
      }

      &.MuiButton-upload__img--btn{
        border: 1.7px solid #b3b3b3;
        padding:9px 20px;
        font-weight: bold;
        font-size: 16px;
        line-height: 140%;
        color: #303030;
        display:flex;
        flex-direction: row-reverse;
        border-radius: 4px;

        img{
          margin-right:6px !important
        }

      }

      &.MuiButton-filters__item--close{
        min-width: 28px;
        width: 28px;
        height: 28px;
        padding:0;
        border-radius:50%;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;

        svg{
          color:#686868;
          transition: all 0.4s ease;
          font-size:15px;
        }

      }
      

      &.MuiButton-filters__clear--btn{
        padding:0;
        height:16px;
        margin-left:22px;
      }

      &.MuiButton-profile__done--btn{
        width:100%;
        background: #7210BE;
        border-radius: 4px;
        font-size: 16px;
        line-height: 22px;
        color: #FFFFFF;
      }

      &.MuiButton-profile__change--btn{
        background: #F5F5F5;
        border: 1.7px solid #E0E0E0;
        border-radius: 4px;
        width:100%;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        margin-bottom:16px;
        color: #848484;
      }

      &.MuiButton-edit__account--btn{
        padding:0;
        min-width:auto;
        height:auto
      }

      &.MuiButton-product__btn{
        border: 1px solid #E0E0E0;
        border-radius: 4px;
        padding:5px 20px;
        height:auto
      }

      &.MuiButton-brand__box{
        background: #fff;
        border: 1px solid #E0E0E0;
        border-radius: 4px;
        padding:8px 15px;
        width: 100%;
        height:auto;
        display: flex;
        align-items: center;
        justify-content: start;

        &:hover{
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
          background: #FAFAFA;
        }
      }

      &.MuiButton-download__model--disabled{
        width: 100%;
        background: #e0e0e0;
        color: #686868;
      }

      &.MuiButton-slider__btn{
        min-width: 36px;
        height: 36px;
        border: 1.7px solid #b3b3b3;
        border-radius: 4px;
        padding:0;
        display: flex;
        align-items: center;
        justify-content: center;
        color:#303030;

        span{
          margin:0 !important
        }

        &:hover{
          opacity:0.7
        }
      }

      &.slider__disabled{
        pointer-events: none;
        opacity:0.5 !important;
      }

      &.MuiButton-buy__model--disabled{
        width:100%;
        background: #E0E0E0;
        border-radius: 4px;
        padding:13px 0;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #686868;
        pointer-events:none
      }
      &.MuiButton-buy__model{
        width:100%;
        background: #7210BE;
        border-radius: 4px;
        padding:13px 0;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #fff;
        transition: all 0.4s ease;

        &:hover{
          background: #9E35EE;
        }
      }

      &.MuiButton-purchesed__models--btn{
        border: 1.7px solid #B3B3B3;
        border-radius: 4px;
        padding:9.5px 16px;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #303030;
        display:flex;
        align-items: center;
      }


      &.MuiButton-bordered__btn--explore-responsive{
        width: 100%;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #303030;
        padding:9.5px 0;
        color:#FFFFFF;
        background-color: #141414;
        position:relative;
        border: 1.7px solid #141414;
        border-radius: 4px;

        &:hover{
          background:#303030
        }
      }

      &.MuiButton-models-page__btn{
        background: #141414;
        border-radius: 4px;
        padding:13px 18px;
      }

      &.MuiButton-apply__filter{
        background: #7210BE;
        border-radius: 4px;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #FFFFFF;
        width:100%;
      }

      &.MuiButton-delete__tag{
        background: #fafafa;
        min-width: 36px;
        width: 36px;
        height: 36px;
        border-radius: 0px !important;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;

        & > .MuiButton-startIcon {
          margin: 0 !important;
        }

        svg path {
          transition: all 0.2s ease;  
        }

        &:hover {
          background-color: #FAE1E1;
        }

        &:hover svg path {
          fill: #DB2E2E;
        }
      }

      &.MuiButton-icon_button{
        min-width: 40px;
        min-height: 40px;
        border-radius: 50% !important;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #0000008a;

        & > .MuiButton-startIcon {
          margin: 0 !important;
        }

        &:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }
      }

`

export const TypographyStyles = (theme) => `
      color:  ${theme.colors.gray[600]};
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
      transition: all 0.4s ease;

      &.MuiTypography-ellipsis__text {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      &.MuiTypography-modal__title {
        font-size: 25px;
        fontWeight: 500;
        margin-bottom:12px;
      }

      &.MuiTypography-card__title {
        width: 60%;
        overflow: hidden;
        white-space: nowrap;
        font-weight: 400;
        text-overflow: ellipsis;
        text-align: start;
        font-size: 12px;
        line-height: 16px;
        display: inline-block;
        align-items: center;
        color: ${theme.colors.gray[700]};
        position:relative;
      }

      &.MuiTypography-modal__sub-title {
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: ${theme.colors.gray[700]};
      }

      &.MuiTypography-card__title-brand {
        padding: 3px;
        background-color: #FAFAFA;
        border: 1px solid #B3B3B3;
        border-radius: 4px;
        font-weight: 400;
        font-size: 10px;
        line-height: 13px;
        letter-spacing: -0.02em;
        text-align: center;
        color: #141414;
      }

      &.MuiTypography-footer__desc{
        margin:14px 0 8px 0;
        font-weight: 400;
        font-size: 13px;
        color: ${theme.colors.gray[600]};
      }

      &.MuiTypography-footer__link{
        padding:9px;

        &:hover{
          background:  ${theme.colors.gray[50]};
          color: #141414;
        }
      }

      &.MuiTypography-footer__title{
        text-align:start;
        font-weight: 600;
        font-size: 18px;
        line-height: 120%;
        margin-bottom:18px;
        color: ${theme.colors.gray[700]};
      }

      &.MuiTypography-section__title{
        
        font-weight: 500;
        font-size: 22px;
        line-height: 120%;
        letter-spacing: -0.02em;
        color: #000;
        margin-bottom:12px;
      }

      &.MuiTypography-pagenation__desc{
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
        color: ${theme.colors.gray[600]};
      }

      &.MuiTypography-pagenation__desc--bold{
        font-weight: 600;
        margin-left: 5px;
      }

      &.MuiTypography-user__name{      
        color: ${theme.colors.gray[700]};
      }

      &.MuiTypography-card__sale{
        position:absolute;
        top: 5px;
        right: 5px;
        font-size: 12px;
        font-weight: 500;
        line-height: 14px;
        letter-spacing: -0.01em;
        color:#fff;
        background: #7210be;
        border: 1.5px solid #fff;
        border-radius: 3px;
        padding: 3px 6px;
        z-index: 10;
        text-transform: uppercase;
      }
      
      &.MuiTypography-category__title{
        font-size: 18px;
        line-height: 22px;
        padding-top: 16px;
        padding-bottom: 16px;
      }

      &.MuiTypography-category__text{
        font-size: 14px;
        line-height: 17px;
        color: #303030;
      }

      &.MuiTypography-category__arrow-title{
        font-weight:400;
        font-size: 18px;
        line-height: 22px;
        padding-top: 16px;
        padding-bottom: 16px;
        margin-left:15px;
        cursor:pointer
      }
      &.MuiTypography-category__link{
        color: #1D5BF9;
        text-decoration: none;
        border-bottom: 2px solid #B7CBFD;
        &:hover{
          color: #5584FA;
        }
      }
      &.MuiTypography-category__name{
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        padding 20px 0 16px 0;
      }

      &.MuiTypography-product__info--title{
        font-weight: 500;
        font-size: 30px;
        line-height: 36px;
        letter-spacing: -0.02em;
        color: #141414;
        margin-bottom: 6px;
      }

      &.MuiTypography-product__info--desc{
        max-width:507px;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        margin-bottom: 28px;
        color: #424242;
      }

      &.MuiTypography-brand__info--title{
        font-weight: 500;
        font-size: 30px;
        line-height: 36px;
        letter-spacing: -0.02em;
        color: #141414;
      }

      &.MuiTypography-brand__info--desc{
        max-width:760px;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #424242;
      }

      &.MuiTypography-brand_page__info--title{
        font-weight: 600;
        font-size: 28px;
        line-height: 41px;
        letter-spacing: -0.02em;
        color: #141414;
      }

      &.MuiTypography-brand_page__info--desc{
        text-align: start;
        font-weight: 400;
        font-size: 16px;
        line-height: 25.6px;
        letter-spacing: -0.02em;
        color: #424242;
      }

      &.MuiTypography-table__text{
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        text-align: start;
        color: #303030;
      }

      &.MuiTypography-table__text_info{
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        text-align: start;
        color: #141414;
      }

      &.MuiTypography-table__link{
        color: #1D5BF9;
        text-decoration: none;
        text-align: start;
        border-bottom: 2px solid #B7CBFD;
        width: fit-content;

        &:hover{
          color: #5584FA;
        }
      }

      &.MuiTypography-material__title{
        color: #424242;
        margin-right:3px;
        margin-bottom: 6px;
      }

      &.MuiTypography-material__text{
        color: #000
      }

      &.MuiTypography-download__button--text{
        font-weight: 400;
        font-size: 14px;
        display: block;
        padding-right: 8px;
        color: #141414;
      }

      &.MuiTypography-download__button--mb{
        font-weight: 400;
        font-size: 13px;
        color: #424242;
        text-align:start;
      }


      &.MuiTypography-account__title{
        font-size: 30px;
        line-height: 120%;
        letter-spacing: -0.02em;
        color: #000;
        margin-bottom: 16px;
      }

      &.MuiTypography-user__name{
        font-size: 20px;
        line-height: 120%;
        letter-spacing: -0.02em;
        color: #303030;
        margin-top: 8px;
        margin-bottom:6px;
      }

      &.MuiTypography-user__email{
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #424242;
      }

      &.MuiTypography-billing__info--text{
        font-size: 14px;
        line-height: 120%;
        color: #141414;
      }

      &.MuiTypography-table__material--text{
        font-weight: 400;
        font-size: 16px;
        line-height: 140%;
        color: #141414;
        margin-right:3px
      }

      &.MuiTypography-not-found__title{
        font-size: 42px;
        line-height: 120%;
        letter-spacing: -0.02em;
        color: #303030;
        margin-bottom:16px;
      }

      &.MuiTypography-not-found__text{
        font-weight: 400;
        font-size: 16px;
        color: #686868;
        max-width:338px;
        margin-bottom:24px;
      }

      &.MuiTypography-modal__title{
        font-weight: 500;
        font-size: 30px;
        line-height: 36px;
        letter-spacing: -0.02em;
        color: #141414;
      }

      &.MuiTypography-buy__dollar{
        font-weight: bold;
        font-size: 17px;
        line-height: 140%;
        color: #fff;
        margin-left:3px;
      }

      &.MuiTypography-drow-down__text{
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #303030;
        margin-left:8px;
      }

      &.MuiTypography-filters__title{
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #686868;
        margin-right: 12px;
      }

      &.MuiTypography-filters__item--text{
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        margin-right: 2px;
        color: #303030;
      }

      &.MuiTypography-filters__clear--text{
        font-size: 12px;
        line-height: 14px;
        letter-spacing: 0.02em;
        color: #1D5BF9;
        margin-left:4px
      }

      &.MuiTypography-edit__account--text{
        font-size: 16px;
        line-height: 22px;
        color: #1D5BF9;
        border-bottom: 1.5px solid #B7CBFD;
      }
      
      &.MuiTypography-brand__name{
        text-align: start;
        font-weight: 400;
        font-size: 13px;
        line-height: 18px;
        color: #A6A6A6;
      }

      &.MuiTypography-brand__title{
        font-size: 18px;
        line-height: 22px;
        letter-spacing: -0.01em;
        color: #7210BE;
        border-bottom: 1.5px solid #b7cbfd;
        width: fit-content;

        &:hover{
          opacity:0.7
        }
      }

      &.MuiTypography-brand__box--text{
        text-align:start;
        font-size: 14px;
        line-height: 17px;
        color: #424242;
      }

      &.MuiTypography-back__text{
        font-size: 14px;
        line-height: 17px;
        color: #0646E6;
        border-bottom: 1.2px solid #B7CBFD;
        margin-left:8px;
        margin-right:10px;
        position:relative;

        &::before{
          content:"";
          position:absolute;
          right:-10px;
          width: 1px;
          height: 16px;
          background: #E0E0E0;
        }
      }

      &.MuiTypography-breadcumb__text{
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        margin-right:9px;
        color: #686868;
      }

      &.MuiTypography-header__bag--count{
        width:20px;
        height:18px;
        padding: 3px 6px 2px;
        position: absolute; 
        right: -8px;
        top: -8px;
        font-size: 12px;
        line-height: 14px;
        display: flex;
        letter-spacing: 0.02em;
        color: #fff;
        z-index: 2;
        background: #141414;
        border: 1px solid #fff;
        border-radius: 10px;
        align-items: end;
        justify-content: center;
      }

      &.MuiTypography-singIn__text{
        font-size: 12px;
        line-height: 14px;
        letter-spacing: 0.02em;
        color: #424242;
      }

      &.MuiTypography-brand__name--text{
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        letter-spacing: -0.01em;
        color: #A6A6A6;
      }

      &.MuiTypography-brand__name--title{
        font-weight: 600;
        font-size: 34px;
        line-height: 41px;
        letter-spacing: -0.02em;
        color: #141414;
        margin-bottom:32px
      }

      &.MuiTypography-brand__desc{
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;  
        letter-spacing: -0.02em;
        color: #303030;
        margin:6px 0 40px 0;
      }

      &.MuiTypography-brands__title{
        font-size: 30px;
        line-height: 36px;
        letter-spacing: -0.02em;
        color: #141414;
        margin-bottom:16px
      }

      &.MuiTypography-download__warning{
        font-size: 14px;
        line-height: 36px;
        letter-spacing: -0.02em;
        color: #eb5454;
        margin-top:5px
      }

      &.MuiTypography-interiors__title{
        font-weight: 600;
        font-size: 34px;
        line-height: 41px;
        letter-spacing: -0.02em;
        color: #141414;
        margin-bottom:8px;
      }

      &.MuiTypography-interiors__desc{
        max-width:800px;
        font-weight: 400;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: -0.01em;
        color: #424242;
        margin-bottom:24px;
      }

      &.MuiTypography-total__price--text{
        font-weight: 400;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: -0.01em;
        color: #424242;
      }

      &.MuiTypography-total__price{
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        letter-spacing: -0.02em;
        color: #141414;
      }

      &.MuiTypography-badge__title{
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #141414;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      &.MuiTypography-purchesed__models--title{
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #141414;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width:150px;
      }
      &.MuiTypography-purchesed__models--desc{
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        letter-spacing: 0.02em;
        color: #686868;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width:150px;
      }

      &.MuiTypography-purchesed__models--date{
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #141414;
      }

      &.MuiTypography-purchesed__models--order{
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #1d5bf9;
        border-bottom: 1.2px solid #b7cbfd;
        width: fit-content;
      }

      &.MuiTypography-purchesed__models--price{
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #141414;
      }

      &.MuiTypography-table__payment--status {
        padding: 4px;
        color: #4FB46A;
      }

      &.MuiTypography-modal__id{
        font-weight: 400;
        font-size: 22px;
        line-height: 26px;
        letter-spacing: -0.02em;
        color: #848484;
        margin-left:12px
      }

      &.MuiTypography-topCategories__name{
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        letter-spacing: -0.01em;
        color: #303030;
        width: 86px;
        margin-bottom:4px;
        display: inline;
      }

      &.MuiTypography-topCategories__desc{
        max-width:250px;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #848484;
      }

      &.MuiTypography-verification__back{
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #1D5BF9;
        border-bottom: 1.2px solid #B7CBFD;
        padding-bottom:1px;
        text-transform: initial;
      }

      &.MuiTypography-table__no--brand{
        font-size: 16px;
        line-height: 140%;
        text-align: start;
        font-weight: 400;
      }

      &.MuiTypography-card__title-free{
        background: #E8F3EB;
        border: 1px solid #B0D9BA;
        border-radius: 3px;
        font-weight: 500;
        font-size: 13px;
        line-height: 18px;
        text-transform: uppercase;
        color: #3C9154;
        padding: 2px 4px;
      }

      &.MuiTypography-footer__gmail{
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #686868;
        text-align:start;
        margin-left:5px
      }

      &.MuiTypography-about__title{
        font-weight: 600;
        font-size: 34px;
        line-height: 41px;
        letter-spacing: -0.02em;
        color: #000000;
        margin-bottom:32px;
      }

      &.MuiTypography-about__desc{
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
        letter-spacing: -0.02em;
        color: #141414;
      }


      &.MuiTypography-models-page__btn--text{
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;
        margin-left:6px;
      }

      &.MuiTypography-models-page__close{
        font-weight: 500;
        font-size: 30px;
        line-height: 36px;
        letter-spacing: -0.02em;
        color: #000000;
      }


      &.MuiTypography-yamo_id{
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;  
        letter-spacing: 0.02em;
        color: #A6A6A6;
      }

      &.MuiTypography-why-us__title{
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        letter-spacing: -0.02em;
        color: #303030;
        margin-bottom:8px;
      }

      &.MuiTypography-why-us__desc{
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: -0.01em;
        color: #686868;
      }

      &.MuiTypography-collection__models--title{
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        letter-spacing: -0.02em;
        color: #141414;
      }

      &.MuiTypography-collection__models--name{
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #141414;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 210px;
      }
      &.MuiTypography-collection__models--desc{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 210px;N
        font-weight: 400;
        font-size: 13px;
        line-height: 18px;
        color: #686868;
        display:block;
        margin-bottom:0;
      }

      &.MuiTypography-collection__models--sale{
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #7210BE;
      }

      &.MuiTypography-collection__models--total{
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #686868;
      }

      &.MuiTypography-collection__models--discount{
        background: #7210BE;
        border-radius: 3px;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        text-align: right;
        letter-spacing: 0.02em;
        color: #FFFFFF;
        padding:2px 4px;
        margin-left:6px
      }

      &.MuiTypography-landing_section_name{
        color: #303030;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        text-align: start;
        letter-spacing: -0.02em;
      }

      &.MuiTypography-landing_section_desc{
        color: #848484;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        text-align: start;
      }

      &.MuiTypography-generalQuestions__desc{
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #686868;
      }

      &.MuiTypography-generalQuestions__title{
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #141414;
      }
      &.MuiTypography-generalQuestions__accardion--desc{
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #424242;
        padding: 0px 18px;
        margin-bottom:12px;
      }

      &.MuiTypography-hero__title{
        font-weight: 600;
        font-size: 38px;
        line-height: 46px;
        text-align: flex-start;
        letter-spacing: -0.04em;
        color: #141414;
        max-width:684px;
        margin:0 auto 16px auto;
      }

      &.MuiTypography-nav__item--text{
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #686868;

        &:hover{
          opacity:0.7
        }
      }

      &.MuiTypography-hero__desc{
        max-width:500px;
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
        text-align: flex-start;
        letter-spacing: -0.02em;
        color: #424242;
        margin-bottom: 28px;
      }

      &.MuiTypography-popular__categories--title{
        font-weight: 500;
        font-size: 22px;
        line-height: 26px;
        letter-spacing: -0.02em;
        color: #141414;
        margin-bottom:12px
      }

      &.MuiTypography-popular__categories--name{
        max-width:108px;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #303030;
      }

      &.MuiTypography-products__result--text{
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #686868;
        margin-bottom:20px
      }

    
      &.MuiTypography-prodcts__result--title{
        font-size: 22px;
        font-weight: 500;
        line-height: 26px;
        letter-spacing: -0.02em;
        color: #141414;
        margin-bottom: 4px
      }

      &.MuiTypography-check__text{
        max-width: 90%;
        font-weight: 400;
        font-size: 13px;
        line-height: 18px;
        color: #424242;
        display:flex;
        align-items:center;

        &::before{
          content:"";
          width:18px;
          height:13px;
          background-image:url("/icons/check.svg");
          background-size:13px 13px;
          margin-right:9px;
          background-repeat: no-repeat;
        }
      }
`