# Ghid: Cum să adaugi efect hover pe produse

## Structura HTML necesară

### ❌ STRUCTURĂ VECHIE (fără hover):
```html
<div class="product-card">
    <img src="imagine-produs.jpg" alt="Nume produs">
    <h3>Nume produs</h3>
    <p class="price">Preț</p>
</div>
```

### ✅ STRUCTURĂ NOUĂ (cu hover):
```html
<div class="product-card">
    <a href="link-produs.html" class="product-link">
        <div class="product-image-wrapper">
            <img src="imagine-front.jpg" alt="Nume produs" class="product-image-main">
            <img src="imagine-back.jpg" alt="Nume produs - spate" class="product-image-hover">
        </div>
    </a>
    <h3>Nume produs</h3>
    <p class="price">Preț</p>
</div>
```

## Pași pentru a adăuga hover pe un produs:

1. **Înlocuiește imaginea simplă** cu structura de mai sus
2. **Adaugă clasa `product-image-main`** pe prima imagine (fața produsului)
3. **Adaugă clasa `product-image-hover`** pe a doua imagine (spatele produsului)
4. **Pune ambele imagini** într-un `<div class="product-image-wrapper">`
5. **Opțional**: Înconjoară wrapper-ul cu un link `<a href="..." class="product-link">` dacă vrei ca produsul să fie clickable

## Exemplu complet:

### Înainte:
```html
<div class="product-card">
    <img src="produs1.jpg" alt="Rochie">
    <h3>Rochie elegantă</h3>
    <p class="price">2.500,00 lei</p>
</div>
```

### După:
```html
<div class="product-card">
    <a href="product-1.html" class="product-link">
        <div class="product-image-wrapper">
            <img src="produs1-front.jpg" alt="Rochie" class="product-image-main">
            <img src="produs1-back.jpg" alt="Rochie - spate" class="product-image-hover">
        </div>
    </a>
    <h3>Rochie elegantă</h3>
    <p class="price">2.500,00 lei</p>
</div>
```

## Note importante:

- **CSS-ul este deja configurat** - nu trebuie să adaugi nimic în `styles.css`
- **JavaScript-ul exclude automat** aceste imagini din lazy loading
- **Prima imagine** (`product-image-main`) apare la încărcare
- **A doua imagine** (`product-image-hover`) apare doar la hover
- **Ambele imagini** trebuie să aibă aceleași dimensiuni pentru un efect smooth

## Dacă un produs nu are imagine de spate:

Păstrează structura simplă (fără `product-image-wrapper` și clase speciale) - va funcționa normal fără hover.

