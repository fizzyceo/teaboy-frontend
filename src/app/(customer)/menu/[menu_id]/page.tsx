"use client";
import getMenu from "@/actions/menu/get-menu";
import Loading from "@/components/shared/loading";
import MenuItemDrawer from "@/components/menu/menuItemDrawer";
import OrderDrawer from "@/components/order/orderDialog";
import SiteHeader from "@/components/menu/siteHeader";
import { useEffect, useState } from "react";
import { useMenuStore } from "@/stores/menu.store";
import { SpaceOrder, useOrderStore } from "@/stores/order.store";
import { CircleAlert } from "lucide-react";
import { translateString } from "@/lib/translate";
import ServiceDrawer from "@/components/menu/ServiceDrawer";
import getSpaceOrders from "@/actions/order/get-space-orders";
import RefreshDialog from "@/components/shared/RefreshDialog";

const MenuPage = ({
  params,
  searchParams,
}: {
  params: { menu_id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { menu, setMenu, isOpen, setIsOpen } = useMenuStore();
  const { spaceId, setSpaceId } = useOrderStore();
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("en");
  const [spaceType, setSpaceType] = useState(null);
  const [spaceOrders, setSpaceOrders] = useState<SpaceOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // State for tracking time
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showRefreshButton, setShowRefreshButton] = useState(false);

  // Fetch menu details on component mount
  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true); // Start loading
        const my_menu = await getMenu(params.menu_id);
        setIsOpen(my_menu.isOpen);
        setMenu(my_menu);
        setSpaceId(my_menu.spaces[0].space_id);
        setSpaceType(my_menu?.spaces[0]?.type);
        setLang(my_menu.spaces[0]?.default_lang?.toLowerCase());
      } catch (error) {
        console.error("Failed to load menu:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    loadMenu();
  }, [params.menu_id, searchParams.space_id, setIsOpen, setMenu, setSpaceId]);

  // Fetch orders for the selected space
  useEffect(() => {
    if (spaceId) {
      const loadOrders = async () => {
        try {
          let fetchedOrders = await getSpaceOrders(spaceId);
          if (!fetchedOrders?.length) return;
          const fixedOrders = fetchedOrders.filter(
            (ord: any) =>
              ord.status === "PENDING" ||
              ord.status === "IN_PROGRESS" ||
              ord.status === "READY",
          );

          setSpaceOrders(fixedOrders);
        } catch (error) {
          console.error("Failed to load orders:", error);
        } finally {
        }
      };

      setLoadingOrders(true); // Start loading orders
      loadOrders();
      setLoadingOrders(false); // End loading orders

      // Set up interval to reload orders every 5 seconds
      const interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => {
          const newElapsedTime = prevElapsedTime + 5000; // Increment by 5 seconds each time

          if (newElapsedTime > 1000 * 60 * 2) {
            setShowRefreshButton(true);
            // clearInterval(interval); // Clear the interval
          } else {
            loadOrders();
          }

          return newElapsedTime;
        });
      }, 5000);

      // Clean up the interval on component unmount or when spaceId changes
      return () => clearInterval(interval);
    }
  }, [spaceId]);

  // Display loading spinner if menu or orders are loading
  if ((loading && !spaceType) || loadingOrders) {
    return <Loading />;
  }
  // Handle case where no menu data is available
  if (!menu) {
    return <p>{translateString("No menu data available.", lang)}</p>;
  }

  const { menu_items, spaces } = menu;

  // Handle case where no spaces are available
  if (!spaces || spaces.length === 0) {
    return <p>{translateString("No spaces available.", lang)}</p>;
  }

  const space = spaces[0];

  const handleRefresh = () => {
    window.location.reload(); // Refresh the page
  };

  // Reset the timer function
  const resetTimer = () => {
    setElapsedTime(0); // Reset elapsed time
    setShowRefreshButton(false); // Hide refresh button
  };

  return (
    <div className="no-scrollbar relative min-h-screen bg-slate-50">
      {/* Display message if the kitchen is closed */}
      {!isOpen && (
        <div className="fixed bottom-0 left-0 z-50 flex h-screen w-full flex-col items-center justify-center border border-gray-100 bg-opacity-10 bg-clip-padding py-4 text-center text-3xl font-medium text-black shadow-md backdrop-blur-sm backdrop-filter">
          <p className="flex size-80 flex-col items-center justify-center gap-4 text-wrap rounded-full bg-red-500 bg-opacity-80 px-10 py-5 text-center backdrop-blur-sm backdrop-filter">
            <CircleAlert size={70} className="animate-pulse" />
            {translateString(
              "The kitchen is now closed, you can't place orders",
              lang,
            )}
          </p>
        </div>
      )}

      {/* Render site header */}
      <SiteHeader lang={lang} space={space} />

      {/* Display menu details */}
      <div className="flex w-full flex-col items-center p-4">
        <p className="text-xl font-bold">
          {/* {lang === "ar" && menu.name_ar ? menu.name_ar : menu.name} */}
        </p>
        <p>{menu.description}</p>
      </div>

      {/* Render menu items */}
      <div className="grid grid-cols-2 gap-4 px-4 pb-28 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {spaceType === "BEACH" ? (
          <>
            {menu_items &&
              menu_items.map((item: any) => {
                // Find the matching order for the current menu item

                const matchingOrder =
                  spaceOrders.length > 0 &&
                  spaceOrders?.find(
                    (order: any) => order.menu_item_id === item.item_id,
                  );

                return (
                  <ServiceDrawer
                    resetTimer={resetTimer}
                    theme={space.theme}
                    lang={lang}
                    currency={menu.currency}
                    base_url={menu.image_url}
                    VAT={menu.VAT}
                    item={item}
                    isOrdered={!!matchingOrder} // Check if there's a matching order
                    order_number={
                      matchingOrder
                        ? matchingOrder.order.order_number
                        : undefined
                    } // Pass order number if exists
                    order={matchingOrder}
                    key={item.item_id}
                  />
                );
              })}
          </>
        ) : (
          <>
            {menu_items &&
              menu_items.map((item: any) => {
                // Find the matching order for the current menu item

                const matchingOrder =
                  spaceOrders.length > 0 &&
                  spaceOrders?.find(
                    (order: any) => order.menu_item_id === item.item_id,
                  );

                return (
                  <MenuItemDrawer
                    theme={space.theme}
                    lang={lang}
                    currency={menu.currency}
                    base_url={menu.image_url}
                    VAT={menu.VAT}
                    item={item}
                    isOrdered={!!matchingOrder} // Check if there's a matching order
                    order_number={
                      matchingOrder
                        ? matchingOrder.order.order_number
                        : undefined
                    } // Pass order number if exists
                    order={matchingOrder}
                    key={item.item_id}
                  />
                );
              })}
          </>
        )}
      </div>

      {/* Order drawer */}
      <div className="fixed bottom-10 flex w-full flex-col items-center justify-center gap-2 px-4">
        <OrderDrawer
          lang={lang}
          currency={menu.currency}
          base_url={menu.image_url}
          VAT={menu.VAT}
          table_number={parseInt(searchParams.table as string)}
        />
      </div>

      {/* Footer link */}
      <a
        href="https://www.clickorder.io"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 font-bold text-gray-700 hover:text-blue-700 hover:underline"
      >
        By ClickOrder.io
      </a>
      <RefreshDialog resetTimer={resetTimer} isOpen={showRefreshButton} />
      {/* Refresh Button */}
      {/* {showRefreshButton && (
        <button
          onClick={handleRefresh}
          style={{ animationDuration: "2s" }}
          className="fixed bottom-10 right-10 animate-pulse rounded-full border border-white bg-blue-600 px-4 py-7 text-xs text-white shadow-blue-500 transition hover:animate-none hover:bg-blue-700"
        >
          Refresh
        </button>
      )} */}
    </div>
  );
};

export default MenuPage;
