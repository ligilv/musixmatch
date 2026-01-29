import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconMusic, IconMicrophone, IconPlayerPlay, IconHeadphones, IconClick } from "@tabler/icons-react";

export default function Page() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="mx-auto max-w-7xl px-8 py-24 sm:py-32">
                    <div className="mx-auto max-w-2xl text-center">
                        {/* Icon Badge */}
                        <div className="mb-8 flex justify-center">
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 shadow-lg">
                                <IconMusic className="size-12 text-primary" />
                            </div>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
                            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                                AudioTerm
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
                            Experience music like never before with{" "}
                            <span className="text-foreground font-semibold">synchronized lyrics</span>
                        </p>
                        <p className="text-lg text-muted-foreground mb-10">
                            Listen to your favorite tracks while following along with perfectly timed lyrics
                        </p>

                        {/* CTA Button */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                asChild
                                size="lg"
                                className="text-lg px-8 py-6 h-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all"
                            >
                                <Link href="/play" className="flex items-center gap-2">
                                    <IconPlayerPlay className="size-6" />
                                    Start Listening
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>
                </div>
            </div>

            {/* Features Section */}
            <div className="mx-auto max-w-7xl px-8 py-16">
                <div className="mx-auto max-w-2xl text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Why AudioTerm?</h2>
                    <p className="text-muted-foreground">
                        Everything you need for the perfect listening experience
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Feature 1 */}
                    <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 w-fit mb-4">
                            <IconMicrophone className="size-6 text-purple-500" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Synced Lyrics</h3>
                        <p className="text-muted-foreground">
                            Lyrics that automatically highlight as the song plays, keeping you in perfect sync
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 w-fit mb-4">
                            <IconHeadphones className="size-6 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">High Quality Audio</h3>
                        <p className="text-muted-foreground">
                            Crystal clear audio playback with full control over your listening experience
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:border-green-500/40 transition-all">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 w-fit mb-4">
                            <IconClick className="size-6 text-green-500" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Interactive Experience</h3>
                        <p className="text-muted-foreground">
                            Click on any lyric to jump to that moment in the song instantly
                        </p>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="text-lg px-8 py-6 h-auto border-2 hover:bg-muted"
                    >
                        <Link href="/play" className="flex items-center gap-2">
                            <IconPlayerPlay className="size-5" />
                            Explore Playlist
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}