import { IpcRendererEvent, IpcRenderer, WebFrame } from 'electron';
import { Ref } from 'vue-demi';
import { MaybeRef } from '@vueuse/shared';

declare type IpcRendererListener = (event: IpcRendererEvent, ...args: any[]) => void;

/**
 * Result from useIpcRenderer
 *
 * @see https://www.electronjs.org/docs/api/ipc-renderer
 */
interface UseIpcRendererReturn {
    /**
     * Listens to channel, when a new message arrives listener would be called with listener(event, args...).
     * [ipcRenderer.removeListener](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovelistenerchannel-listener) automatically on unmounted.
     *
     * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendereronchannel-listener
     */
    on(channel: string, listener: IpcRendererListener): IpcRenderer;
    /**
     * Adds a one time listener function for the event. This listener is invoked only the next time a message is sent to channel, after which it is removed.
     *
     * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendereroncechannel-listener
     */
    once(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void): IpcRenderer;
    /**
     * Removes the specified listener from the listener array for the specified channel.
     *
     * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovelistenerchannel-listener
     */
    removeListener(channel: string, listener: (...args: any[]) => void): IpcRenderer;
    /**
     * Removes all listeners, or those of the specified channel.
     *
     * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovealllistenerschannel
     */
    removeAllListeners(channel: string): IpcRenderer;
    /**
     * Send an asynchronous message to the main process via channel, along with arguments.
     *
     * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrenderersendchannel-args
     */
    send(channel: string, ...args: any[]): void;
    /**
     * Returns Promise<any> - Resolves with the response from the main process.
     * Send a message to the main process via channel and expect a result ~~asynchronously~~.
     * As composition-api, it makes asynchronous operations look like synchronous.
     *
     * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args
     */
    invoke<T>(channel: string, ...args: any[]): Ref<T | null>;
    /**
     * Returns any - The value sent back by the ipcMain handler.
     * Send a message to the main process via channel and expect a result synchronously.
     *
     * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrenderersendsyncchannel-args
     */
    sendSync<T>(channel: string, ...args: any[]): Ref<T | null>;
    /**
     * Send a message to the main process, optionally transferring ownership of zero or more MessagePort objects.
     *
     * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererpostmessagechannel-message-transfer
     */
    postMessage(channel: string, message: any, transfer?: MessagePort[]): void;
    /**
     * Sends a message to a window with webContentsId via channel.
     *
     * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrenderersendtowebcontentsid-channel-args
     */
    sendTo(webContentsId: number, channel: string, ...args: any[]): void;
    /**
     * Like ipcRenderer.send but the event will be sent to the <webview> element in the host page instead of the main process.
     *
     * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrenderersendtohostchannel-args
     */
    sendToHost(channel: string, ...args: any[]): void;
}
/**
 * Get the `ipcRenderer` module with all APIs.
 *
 * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrenderersendtohostchannel-args
 * @see https://vueuse.org/useIpcRenderer
 */
declare function useIpcRenderer(ipcRenderer?: IpcRenderer): UseIpcRendererReturn;

/**
 * Returns Promise<any> - Resolves with the response from the main process.
 *
 * Send a message to the main process via channel and expect a result ~~asynchronously~~. As composition-api, it makes asynchronous operations look like synchronous.
 *
 * You need to provide `ipcRenderer` to this function.
 *
 * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args
 * @see https://vueuse.org/useIpcRendererInvoke
 */
declare function useIpcRendererInvoke<T>(ipcRenderer: IpcRenderer, channel: string, ...args: any[]): Ref<T | null>;
/**
 * Returns Promise<any> - Resolves with the response from the main process.
 *
 * Send a message to the main process via channel and expect a result ~~asynchronously~~. As composition-api, it makes asynchronous operations look like synchronous.
 *
 * `ipcRenderer` will be automatically gotten.
 *
 * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args
 * @see https://vueuse.org/useIpcRendererInvoke
 */
declare function useIpcRendererInvoke<T>(channel: string, ...args: any[]): Ref<T | null>;

/**
 * Listens to channel, when a new message arrives listener would be called with listener(event, args...).
 * [ipcRenderer.removeListener](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovelistenerchannel-listener) automatically on unmounted.
 *
 * You need to provide `ipcRenderer` to this function.
 *
 * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendereronchannel-listener
 * @see https://vueuse.org/useIpcRendererOn
 */
declare function useIpcRendererOn(ipcRenderer: IpcRenderer, channel: string, listener: IpcRendererListener): IpcRenderer;
/**
 * Listens to channel, when a new message arrives listener would be called with listener(event, args...).
 * [ipcRenderer.removeListener](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovelistenerchannel-listener) automatically on unmounted.
 *
 * `ipcRenderer` will be automatically gotten.
 *
 * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendereronchannel-listener
 * @see https://vueuse.org/useIpcRendererOn
 */
declare function useIpcRendererOn(channel: string, listener: IpcRendererListener): IpcRenderer;

declare function useZoomFactor(factor: MaybeRef<number>): Ref<number>;
declare function useZoomFactor(webFrame: WebFrame, factor: MaybeRef<number>): Ref<number>;
declare function useZoomFactor(webFrame: WebFrame): Ref<number>;
declare function useZoomFactor(): Ref<number>;

declare function useZoomLevel(level: MaybeRef<number>): Ref<number>;
declare function useZoomLevel(webFrame: WebFrame, level: MaybeRef<number>): Ref<number>;
declare function useZoomLevel(webFrame: WebFrame): Ref<number>;
declare function useZoomLevel(): Ref<number>;

export { UseIpcRendererReturn, useIpcRenderer, useIpcRendererInvoke, useIpcRendererOn, useZoomFactor, useZoomLevel };
