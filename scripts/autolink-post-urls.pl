#!/usr/bin/perl
# Wraps bare URLs in _posts/*.md as <https://...> so kramdown renders them as links.
# Skips front matter, fenced code blocks, inline code, and URLs that are already
# part of a markdown link, <autolink>, or HTML attribute.
use strict; use warnings;

for my $file (@ARGV) {
  open(my $in, '<:raw', $file) or next;
  my @lines = <$in>; close $in;
  my ($changed, $fm, $fence) = (0, 0, 0);
  for my $i (0 .. $#lines) {
    my $line = $lines[$i];
    if ($i == 0 && $line =~ /^---\s*$/) { $fm = 1; next }
    if ($fm) { $fm = 0 if $line =~ /^---\s*$/; next }
    if ($line =~ /^\s*(```|~~~)/) { $fence = !$fence; next }
    next if $fence;
    # split on inline code spans; only touch the non-code parts
    my @parts = split /(`[^`]*`)/, $line, -1;
    for my $p (@parts) {
      next if $p =~ /^`/;
      $p =~ s{(?<![<(\["'=/\]])(https?://[^\s<>"']+)}{
        my $url = $1; my $tail = '';
        while ($url =~ s/([.,;:!?)\]]+)$//) { $tail = $1 . $tail }
        "<$url>$tail"
      }ge;
    }
    my $new = join '', @parts;
    if ($new ne $line) { $lines[$i] = $new; $changed = 1 }
  }
  if ($changed) {
    open(my $out, '>:raw', $file) or next;
    print $out @lines; close $out;
    print "autolink-post-urls: linked bare URLs in $file\n";
  }
}
