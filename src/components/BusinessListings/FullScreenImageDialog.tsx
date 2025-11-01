import Image from "next/image";
import Button from "../UI/Button";
import { IoMdClose } from "react-icons/io";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../UI/Carousel";
import { Dialog, DialogContent, DialogTitle } from "../UI/Dialog";
import { Dispatch, SetStateAction } from "react";

export type BusinessWithImages = {
  name: string;
  images: string[];
};

type FullScreenImageDialogProps = {
  selectedImageIndex: number | null;
  setSelectedImageIndex: Dispatch<SetStateAction<number | null>>;
  business: BusinessWithImages;
};

function FullScreenImageDialog({
  selectedImageIndex,
  setSelectedImageIndex,
  business,
}: FullScreenImageDialogProps) {
  return (
    <Dialog
      open={selectedImageIndex !== null}
      onOpenChange={() => setSelectedImageIndex(null)}
    >
      <DialogContent className="max-w-[100vw] h-screen w-full p-0">
        <DialogTitle className="sr-only">
          {business.name} — Image Gallery
        </DialogTitle>

        <div className="relative w-full h-full flex items-center justify-center">
          <Button
            buttonType="outline"
            className="absolute w-10 h-10 top-4 right-2 z-50 rounded-full"
            onClick={() => setSelectedImageIndex(null)}
          >
            <IoMdClose />
          </Button>

          <Carousel
            className="w-full h-full"
            opts={{ startIndex: selectedImageIndex ?? 0 }}
          >
            <CarouselContent className="h-full ">
              {business.images.map((image, index) => (
                <CarouselItem key={index} className="h-full">
                  <div
                    className="relative rounded-2xl overflow-hidden max-w-5xl max-md:my-50 my-6  mx-auto max-md:h-[500px] h-[95vh] cursor-pointer"
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      fill
                      src={image}
                      alt={`${business.name} ${index + 1}`}
                      className="w-full h-full object-cover "
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-4 h-12 w-12  max-md:hidden" />
            <CarouselNext className="right-4 h-12 w-12 max-md:hidden" />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default FullScreenImageDialog;
