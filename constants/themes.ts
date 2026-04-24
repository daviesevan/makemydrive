export const colors = {
    // Core palette
    background: "#EEEAE0",       // neutral — page foundation
    foreground: "#151412",       // primary — headlines & core text
    card: "#FBF7EC",             // surface — card backgrounds
    muted: "#EEEAE0",            // neutral — muted areas
    mutedForeground: "#777268",  // secondary — captions, metadata, borders

    // Brand
    primary: "#151412",          // primary
    accent: "#F2C94C",           // tertiary — sole interaction driver, reserve it

    // Semantic
    border: "#777268",           // secondary — borders
    success: "#16a34a",          // unchanged
    destructive: "#dc2626",      // unchanged

    // Retained for compatibility
    subscription: "#8fd1bd",
} as const;

export const spacing = {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    14: 56,
    16: 64,
    18: 72,
    20: 80,
    24: 96,
    30: 120,
} as const;

export const radius = {
    sm: 0,   // 0px  — neobrutalist: sharp
    md: 2,   // 2px
    lg: 4,   // 4px
} as const;

export const typography = {
    display: {
        fontFamily: "Plus Jakarta",
        fontSize: 56,    // 3.5rem @ 16px base
        fontWeight: "700" as const,
        letterSpacing: -0.02 * 56,
    },
    h1: {
        fontFamily: "Plus Jakarta",
        fontSize: 29,    // ~1.8rem
        fontWeight: "700" as const,
    },
    body: {
        fontFamily: "Inter",
        fontSize: 15,    // ~0.95rem
        lineHeight: 1.65,
    },
    label: {
        fontFamily: "Plus Jakarta",
        fontSize: 12,    // ~0.72rem
        letterSpacing: 0.1 * 12,
    },
} as const;

export const components = {
    tabBar: {
        height: spacing[18],
        horizontalInset: spacing[5],
        radius: radius.sm,           // sharp — neobrutalist
        iconFrame: spacing[12],
        itemPaddingVertical: spacing[2],
    },
    buttonPrimary: {
        backgroundColor: colors.accent,
        textColor: colors.primary,
        borderRadius: radius.md,
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: colors.card,
        textColor: colors.foreground,
        borderRadius: radius.lg,
        padding: spacing[6],         // 24px
    },
} as const;

export const theme = {
    colors,
    spacing,
    radius,
    typography,
    components,
} as const;