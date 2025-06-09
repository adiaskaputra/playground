package main

import (
	"context"
	"log"
	"net/http"

	"github.com/chromedp/cdproto/page"
	"github.com/chromedp/chromedp"
)

func main() {
	u := "http://127.0.0.1:5500/GITHUB/playground-go-chromedp/pdf-template/template-1.html"
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	mux := http.NewServeMux()
	mux.HandleFunc("/pdf", func(w http.ResponseWriter, r *http.Request) {
		var buf []byte
		if err := chromedp.Run(ctx, printToPDF(u, &buf)); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/pdf")
		w.Write(buf)
	})

  // http://127.0.0.1:4000/pdf
	err := http.ListenAndServe(":4000", mux)
	if err != nil {
		log.Fatalf("could not start server: %v", err)
	}
}

func printToPDF(urlstr string, res *[]byte) chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Navigate(urlstr),
		chromedp.ActionFunc(func(ctx context.Context) error {
			buf, _, err := page.PrintToPDF().WithPrintBackground(false).Do(ctx)
			if err != nil {
				return err
			}
			*res = buf
			return nil
		}),
	}
}
