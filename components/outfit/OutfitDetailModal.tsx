"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type OutfitDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function OutfitDetailModal({
  isOpen,
  onClose,
}: OutfitDetailModalProps) {
  // Lock the background page while the modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        overflow-hidden
        bg-black/40
        p-4
        backdrop-blur-sm
        sm:p-6
      "
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          flex
          h-[90vh]
          w-full
          max-w-[900px]
          flex-col
          overflow-y-auto
          overscroll-contain
          no-scrollbar
          rounded-3xl
          bg-white
          shadow-2xl

          md:grid
          md:h-[80vh]
          md:min-h-0
          md:grid-cols-2
          md:overflow-hidden
        "
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="
            absolute
            right-4
            top-4
            z-30
            rounded-full
            bg-white/80
            p-2
            text-neutral-400
            backdrop-blur-sm
            transition
            hover:bg-white
            hover:text-neutral-700

            md:right-5
            md:top-5
          "
        >
          <X size={22} strokeWidth={1.5} />
        </button>

        {/* IMAGE */}
        <div
          className="
            flex
            w-full
            shrink-0
            items-center
            justify-center
            bg-neutral-100
            px-6
            py-6

            md:h-full
            md:min-h-0
            md:px-0
            md:py-0
          "
        >
          <div
            className="
            aspect-[3/4]
            w-full
            max-w-[360px]
            overflow-hidden

            md:h-full
            md:w-full
            md:max-w-none
            md:aspect-auto
          "
          >
            <img
              src="/images/outfits/outfit_81233.png"
              alt="Summer Escape outfit"
              className="
                h-full
                w-full
                object-contain
              "
            />
          </div>
        </div>

        {/* DETAILS */}
        <div
          className="
            w-full
            shrink-0
            px-6
            py-8

            sm:px-8

            md:h-full
            md:overflow-y-auto
            md:px-10
            md:py-10
          "
        >
          {/* Title */}
          <h2
            className="
              mt-2
              text-3xl
              font-thin
              leading-tight
              text-neutral-500

              sm:text-4xl

              md:mt-10
              md:text-3xl
            "
          >
            Summer Escape
          </h2>

          {/* Description */}
          <p
            className="
              mt-5
              max-w-md
              text-base
              leading-7
              text-neutral-600
            "
          >
            Relaxed tailoring paired with soft summer tones for everyday city
            wear.
          </p>

          {/* Products */}
          <div className="mt-8 sm:mt-10">
            <div className="flex items-center justify-between gap-4 border-b border-neutral-300 py-4 text-neutral-500">
              <span>Striped V-neck Cloak</span>

              <a
                href="https://www.shopcider.com/goods/lyocell-blend-striped-v-neck-cloak-sleeve-ruched-tie-back-top-115467267?style_id=2293792&gaListId=12&gaListName=Feeling%20Cool&ciderListId=2&ciderListName=Feeling%20Cool&selectSkuIndex=0&moduleTitle=1&p=115467267&shopPage=1&shopIndex=7&navTitle=Feeling%20Cool&navId=12&listSort=&listId=112399&listAttribute=&operationContent=Feeling%20Cool&operationImage=&linkUrl=https%3A%2F%2Fwww.shopcider.com%2Fcategory%2Ffeeling-cool-cid-112399&operationpageTitle=homepage&operationPosition=2-0-4&operationType=category&productPosition=8&strategyNameList=reco_rank_model_v6%3Aexp_2-reco_req_time%3A1786507225316-all_user_exp_2607%3Aexp-collectionId%3A112399%3AControl&businessTracking=eyJmaXJzdEltYWdlVHlwZSI6Iuato%20mdouS4iuWNiui6qyIsIml0ZW1UeXBlIjowLCJsaXN0SWQiOjExMjM5OSwibGlzdFRpdGxlIjoiRmVlbGluZyBDb29sIiwibGlzdFR5cGUiOjIsIm1vZHVsZUlkIjozLCJtb2R1bGVUeXBlIjoiQ09MTEVDVElPTl9QSU5fVE9QLEdFTkVSQUxfSE9ULFBJTl9UT1AsU1dJTkciLCJwcm9kdWN0UHJpbWFyeUltYWdlRmxhZyI6dHJ1ZSwic2FsZVByaWNlIjoyNC45MCwic2NlbmUiOiJDQVRFR09SWV9DT0xMRUNUSU9OIiwic2tjRmlyc3RJbWciOiIxNzgwNjQwMjcxMDAwLXI2YjZlei5qcGciLCJzcHUiOjExNTQ2NzI2Nywic3B1Q29kZSI6IkNEMjAyNjAzMjU2ODQ1MjNLVCIsInN0cmF0ZWd5TmFtZSI6InJlY29fcmFua19tb2RlbF92NjpleHBfMi1yZWNvX3JlcV90aW1lOjE3ODY1MDcyMjUzMTYtYWxsX3VzZXJfZXhwXzI2MDc6ZXhwLWNvbGxlY3Rpb25JZDoxMTIzOTk6Q29udHJvbCIsInRyYWNraW5nSWQiOiIxMmJmNjQ2ZC0zZjhiLTQyNjQtODQ3YS03ZDRhMWEzNmVlYzgifQ%3D%3D&listType=2&listTitle=Feeling%20Cool"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm underline underline-offset-4 transition hover:text-black"
              >
                Shop →
              </a>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-neutral-300 py-4 text-neutral-500">
              <span>Denim High Rise Shorts</span>

              <a
                href="https://www.shopcider.com/goods/washed-denim-high-rise-metal-detail-regular-shorts-115355862?style_id=2268148&gaListId=12&gaListName=Shorts&ciderListId=2&ciderListName=Shorts&selectSkuIndex=0&moduleTitle=1&p=115355862&shopPage=3&shopIndex=30&navTitle=Shorts&navId=12&listSort=&listId=122526&listAttribute=&operationContent=Shorts&operationImage=&linkUrl=https%3A%2F%2Fwww.shopcider.com%2Fcategory%2Fshorts-cid-122526&operationpageTitle=%2Fcategory%2Fjeans-cid-146464&operationPosition=1-1-1-1&operationType=category&productPosition=31&strategyNameList=reco_rank_model_v6%3Aexp_2-reco_env%3Agray-reco_req_time%3A1786507769569-all_user_exp_2607%3Aexp-collectionId%3A122526%3AControl&businessTracking=eyJmaXJzdEltYWdlVHlwZSI6Iuato%20mdouS4i%20WNiui6qyIsIml0ZW1UeXBlIjowLCJsaXN0SWQiOjEyMjUyNiwibGlzdFRpdGxlIjoiU2hvcnRzIiwibGlzdFR5cGUiOjIsIm1vZHVsZUlkIjozLCJtb2R1bGVUeXBlIjoiQ09MTEVDVElPTl9PRkZMSU5FLEdFTkVSQUxfSE9UIiwib3JpZ2luYWxQcmljZSI6MzQuOTAsInByb2R1Y3RQcmltYXJ5SW1hZ2VGbGFnIjpmYWxzZSwic2FsZVByaWNlIjoxMy45Niwic2NlbmUiOiJDQVRFR09SWV9DT0xMRUNUSU9OIiwic2tjRmlyc3RJbWciOiIxNzczMzk2MDI3MDAwLWpqbWYzTi5qcGciLCJzcHUiOjExNTM1NTg2Miwic3B1Q29kZSI6IkNEMjAyNTExMjQ2NjI1NTBEUyIsInN0cmF0ZWd5TmFtZSI6InJlY29fcmFua19tb2RlbF92NjpleHBfMi1yZWNvX2VudjpncmF5LXJlY29fcmVxX3RpbWU6MTc4NjUwNzc2NjkyMy1hbGxfdXNlcl9leHBfMjYwNzpleHAtY29sbGVjdGlvbklkOjEyMjUyNjpDb250cm9sIiwidHJhY2tpbmdJZCI6IjNhZmYwNjIxLWZjNGItNDRjMy05MjMwLTk5NTZiY2MyYjRmNyJ9&listType=2&listTitle=Shorts"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm underline underline-offset-4 transition hover:text-black"
              >
                Shop →
              </a>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-neutral-300 py-4 text-neutral-500">
              <span>Flats</span>

              <a
                href="https://www.shopcider.com/goods/bowknot-mary-jane-flats-115101044?style_id=2289934&gaListId=12&gaListName=Shoes&ciderListId=2&ciderListName=Shoes&selectSkuIndex=0&moduleTitle=1&p=115101044&shopPage=1&shopIndex=1&navTitle=Shoes&navId=12&listSort=&listId=8768&listAttribute=&operationContent=Shoes&operationImage=&linkUrl=https%3A%2F%2Fwww.shopcider.com%2Fcategory%2Fshoes-cid-8768&operationpageTitle=product_detail&operationPosition=7&operationType=category&productPosition=2&strategyNameList=reco_collection_customized-reco_rank_model_v6%3Aexp_2-reco_req_time%3A1786507703100-all_user_exp_2607%3Aexp-collectionId%3A8768%3AControl&businessTracking=eyJmaXJzdEltYWdlVHlwZSI6Iuato%20mdouWbviIsIml0ZW1UeXBlIjowLCJsaXN0SWQiOjg3NjgsImxpc3RUaXRsZSI6IlNob2VzIiwibGlzdFR5cGUiOjIsIm1vZHVsZUlkIjozLCJtb2R1bGVUeXBlIjoiQ09MTEVDVElPTl9QSU5fVE9QLEdFTkVSQUxfSE9ULFBJTl9UT1AsU1dJTkciLCJwcm9kdWN0UHJpbWFyeUltYWdlRmxhZyI6ZmFsc2UsInNhbGVQcmljZSI6MzcuOTAsInNjZW5lIjoiQ0FURUdPUllfQ09MTEVDVElPTiIsInNrY0ZpcnN0SW1nIjoiMTc3NzU0OTg2NjAwMC1UMjVOSkMuanBnIiwic3B1IjoxMTUxMDEwNDQsInNwdUNvZGUiOiJDRDIwMjUxMDE1NjUxNDMwTUpTIiwic3RyYXRlZ3lOYW1lIjoicmVjb19jb2xsZWN0aW9uX2N1c3RvbWl6ZWQtcmVjb19yYW5rX21vZGVsX3Y2OmV4cF8yLXJlY29fcmVxX3RpbWU6MTc4NjUwNzcwMzEwMC1hbGxfdXNlcl9leHBfMjYwNzpleHAtY29sbGVjdGlvbklkOjg3Njg6Q29udHJvbCIsInRyYWNraW5nSWQiOiJlZjE3NDg0ZC1iZGNjLTQ3ZDUtOTFiNS1iM2ZkZTlhMTFkNGYifQ%3D%3D&listType=2&listTitle=Shoes"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm underline underline-offset-4 transition hover:text-black"
              >
                Shop →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
