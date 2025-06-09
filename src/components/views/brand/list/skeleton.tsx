import {
  liAvatarSx,
  liAvatarWrapper,
  liHeaderSx,
  liHeaderTextSx,
  listSx,
  liSx,
} from "@/styles/styles";
import { brandsLimit } from "@/types/filters";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";

const fakeBrands = Array.from({ length: brandsLimit });

export default function BrandListSkeleton() {
  return (
    <List sx={{ ...listSx, marginBottom: "32px" }}>
      <ListItem alignItems="center" key={-1} sx={liHeaderSx}>
        <Box sx={{ ...liHeaderTextSx, minWidth: "490px" }}>
          <Skeleton variant="rectangular" width={56} height={20} />
        </Box>
        <Box sx={{ ...liHeaderTextSx, minWidth: "400px" }}>
          <Skeleton variant="rectangular" width={56} height={20} />
        </Box>
        <Box sx={{ ...liHeaderTextSx, minWidth: "180px" }}>
          <Skeleton variant="rectangular" width={56} height={20} />
        </Box>
      </ListItem>
      {fakeBrands?.map((_, index: any) => (
        <Box key={index}>
          <ListItem alignItems="center" sx={liSx}>
            <ListItemAvatar sx={{ ...liAvatarWrapper, borderRadius: "8px" }}>
              <Skeleton variant="rectangular" sx={liAvatarSx} />
            </ListItemAvatar>

            <ListItemText
              className="brand_name"
              sx={{ marginLeft: "24px", minWidth: "380px" }}
            >
              <Skeleton
                variant="rectangular"
                width={100}
                height={20}
                sx={{ marginBottom: "5px" }}
              />
              <Skeleton variant="rectangular" width={80} height={18} />
            </ListItemText>

            <ListItemText sx={{ minWidth: "400px" }}>
              <Skeleton variant="rectangular" width={56} height={20} />
            </ListItemText>
            <ListItemText sx={{ minWidth: "180px" }}>
              <Skeleton variant="rectangular" width={56} height={20} />
            </ListItemText>
          </ListItem>
        </Box>
      ))}
    </List>
  );
}
