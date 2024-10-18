import { Box } from "@mui/material";
import styles from '@/styles/search_bar.module.scss'
import SearchInput from "@/components/inputs/search";
import { useState } from "react";
import { SearchOption, SearchOptionTabs } from "./search_option_tabs";
import { ContainerStyle } from "@/styles/styles";
import SimpleTypography from "@/components/typography";

const searchOptions: SearchOption[] = [
  {
    title: 'Модели',
    value: 'models'
  },
  {
    title: 'Интерьеры',
    value: 'interiors'
  },
  {
    title: 'Дизайнеры',
    value: 'designers'
  },
  {
    title: 'Бренды',
    value: 'brands'
  }
]

export function SearchBar({isOpen, setIsOpen}) {


  const [searchVal, setSearchVal] = useState("");

    return (

        <Box 
            className={styles.search_bar_container}
            sx={{
              top: isOpen ? '100%' : 0,
              pointerEvents: isOpen ? 'all' : 'none',
              opacity: isOpen ? 1 : 0 
            }}
            >
            <Box sx={{...ContainerStyle, minHeight: 'unset'}}>
              <Box 
                className={styles.search_bar_wrapper}
                sx={{
                  flexDirection: {xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column'}
                }}
              >

                <SearchInput
                  sx={{
                    width: '300px',
                    mb: {sm: '8px', xs: '8px'}
                  }}
                  noAutoSearch
                  value={searchVal}
                  className="search__input--models"
                  onChange={(val) => setSearchVal(val)}
                  placeHolder="Что вы хотите найти?"
                  startIcon={true}
                />

                  <Box display={'flex'} alignItems={'center'} p={'0 24px'}
                  flexDirection={{xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column'}}
                  >
                    <SimpleTypography sx={{textWrap: 'nowrap', lineHeight: 'unset', mb: {sm: '8px', xs: '8px'}}} text="Искать из:"/>
                    <SearchOptionTabs options={searchOptions} searchValue={searchVal}/>
                  </Box>

              </Box>
            </Box>
        </Box>
    )
}